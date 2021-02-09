import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import QuestionsRepository from '../repositories/QuestionsRepository';
import CreateQuestionService from '../services/CreateQuestionService';
import DeleteQuestionService from '../services/DeleteQuestionService';

const questionsRoutes = Router();

questionsRoutes.get('/', async (request, response) => {
  const { exam_id } = request.body;

  const questionRepository = getCustomRepository(QuestionsRepository);

  const exams = await questionRepository.getByExam({ exam_id });

  return response.json(exams);
});

questionsRoutes.post('/', async (request, response) => {
  const { exam_id, statement, options } = request.body;

  const createQuestion = new CreateQuestionService();

  const question = await createQuestion.execute({
    exam_id,
    statement,
    options,
  });

  return response.json(question);
});

questionsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteQuestion = new DeleteQuestionService();

  await deleteQuestion.execute({ id });

  return response.status(204).send();
});

export default questionsRoutes;
