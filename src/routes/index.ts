import { Router } from 'express';
import examsRoutes from './exams.routes';

const routes = Router();

routes.use('/exams', examsRoutes);

export default routes;
