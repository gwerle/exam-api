import { Router } from 'express';

import { getRepository } from 'typeorm';
import Exam from '../models/Exam';
import CreateExamService from '../services/CreateExamService';
import UpdateExamService from '../services/UpdateExamService';
import DeleteExamService from '../services/DeleteExamService';

const examsRoutes = Router();

examsRoutes.get('/', async (request, response) => {
  const examsRepository = getRepository(Exam);
  const exams = await examsRepository.find();

  return response.json(exams);
});

examsRoutes.post('/', async (request, response) => {
  const { name, description, type } = request.body;

  const createExam = new CreateExamService();

  const exam = await createExam.execute({ name, description, type });

  return response.json(exam);
});

examsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, description, type } = request.body;

  const updateExam = new UpdateExamService();

  const exam = await updateExam.execute({ id, name, description, type });

  return response.json(exam);
});

examsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteExam = new DeleteExamService();

  await deleteExam.execute({ id });

  return response.status(204).send();
});

export default examsRoutes;
