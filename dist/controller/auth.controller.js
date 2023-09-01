"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../config/db.connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
const userRegister = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.username || !body.password || !body.role) {
            return res.status(400).json({
                success: false,
                message: "Username, password, and role are required fields",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(body.password, saltRounds);
        const insertResult = await db_connection_1.db.query(`INSERT INTO sellout_tracking.auth_table (username, password, role)
      VALUES (?, ?, ?)`, [body.username, hashedPassword, body.role]);
        const id = insertResult.insertId;
        const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY || "default-secret-key", { expiresIn: "100y" });
        const selectResult = await db_connection_1.db.query(`SELECT * FROM sellout_tracking.auth_table WHERE id = ?`, [id]);
        const user = selectResult[0];
        res.status(200).json({
            success: true,
            data: user,
            token,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Create User Failed",
        });
    }
};
const loginUser = async (req, res, next) => {
    try {
        const { password, username } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required fields",
            });
        }
        // Retrieve the user from the database by username
        const getUserQuery = `SELECT * FROM sellout_tracking.auth_table WHERE username = '${username}'`;
        const [queryResult] = await db_connection_1.db.query(getUserQuery);
        if (queryResult.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        // Extract user data from the query result
        const userData = queryResult[0];
        // Verify the password using bcrypt
        const isPasswordValid = await bcrypt_1.default.compare(password, userData.password);
        console.log("Kata sandi yang di-hash dari basis data:", userData.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        // const customKey: string = 'j_sign'
        // const token = jwt.sign(
        //   { id: userData.id, username: userData.username, role: userData.role },
        //   process.env.SECRET_KEY || "default-secret-key",
        //   { expiresIn: "1y" }, 
        // );
        const customKey = 'j_sign';
        const user = {
            id: '123',
            username: 'exampleUser',
            role: 'user',
        };
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            role: user.role,
        }, customKey, // Use your custom signing key here
        { expiresIn: '1y' });
        console.log(token);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
const authController = { userRegister, loginUser };
exports.default = authController;
