import { Router } from 'express';
import examsRoutes from './exams.routes';
import questionsRoutes from './questions.routes';

const routes = Router();

routes.use('/exams', examsRoutes);
routes.use('/questions', questionsRoutes);

export default routes;
