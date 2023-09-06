import express from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import { db } from './config/db.connection'
import userRoutes from './routes/user.route';
import selloutRoutes from './routes/sellout.route';
import authRoutes from './routes/auth.route';
import { authenticationMiddleware, authorizationMiddleware } from './middleware/auth.middleware';
import errorHandlerMiddleware from './middleware/error.handling';

const routes = express.Router()

const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());
app.use(express.json())
app.use(routes);

routes.use('/auth', authRoutes)
routes.use('/user', authenticationMiddleware, userRoutes)
routes.use('/sellout', authenticationMiddleware, selloutRoutes)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
