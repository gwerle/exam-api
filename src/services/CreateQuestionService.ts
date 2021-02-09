import { getRepository, getCustomRepository } from 'typeorm';
import { anyNonNil } from 'is-uuid';
import Option from '../models/Option';
import AppError from '../errors/AppError';
import Exam from '../models/Exam';
import QuestionsRepository from '../repositories/QuestionsRepository';

interface OptionDTO {
  value: string;
  correct: boolean;
}

interface Request {
  exam_id: string;
  statement: string;
  options: OptionDTO[];
}

class CreateQuestionService {
  public async execute({
    exam_id,
    statement,
    options,
  }: Request): Promise<unknown> {
    if (!anyNonNil(exam_id)) {
      throw new AppError('UUID inválido');
    }

    if (!options || options.length === 0) {
      throw new AppError('Insira uma opção de resposta');
    }

    const onlyCorrectOptions = options.filter(option => option.correct);

    if (onlyCorrectOptions.length === 0) {
      throw new AppError(
        'Você precisa cadastrar pelo menos uma resposta correta',
      );
    }

    if (onlyCorrectOptions.length > 1) {
      throw new AppError(
        'Você está tentando cadastrar mais que uma resposta correta',
      );
    }

    const questionsRepository = getCustomRepository(QuestionsRepository);
    const optionsRepository = getRepository(Option);
    const examsRepository = getRepository(Exam);

    const exam = await examsRepository.findOne(exam_id);

    if (!exam) {
      throw new AppError('Prova não encontrada!');
    }

    const questionCreated = await questionsRepository.create({
      exam_id,
      statement,
    });

    const question = await questionsRepository.save(questionCreated);

    options.forEach(async option => {
      const optionCreated = optionsRepository.create({
        value: option.value,
        correct: option.correct,
        question_id: question.id,
      });
      await optionsRepository.save(optionCreated);
    });

    return { ...question, options: [...options] };
  }
}

export default CreateQuestionService;
