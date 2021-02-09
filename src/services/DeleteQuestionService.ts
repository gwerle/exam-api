import { getRepository, getCustomRepository } from 'typeorm';
import { anyNonNil } from 'is-uuid';
import Option from '../models/Option';
import AppError from '../errors/AppError';
import QuestionsRepository from '../repositories/QuestionsRepository';

interface Request {
  id: string;
}

class DeleteQuestionService {
  public async execute({ id }: Request): Promise<void> {
    const questionsRepository = getCustomRepository(QuestionsRepository);
    const optionsRepository = getRepository(Option);

    if (!anyNonNil(id)) {
      throw new AppError('UUID inválido');
    }

    const question = await questionsRepository.findOne(id);

    if (!question) {
      throw new AppError('Questão não existe');
    }

    const options = await optionsRepository.find({
      where: { question_id: question.id },
    });

    await optionsRepository.remove(options);
    await questionsRepository.remove(question);
  }
}

export default DeleteQuestionService;
