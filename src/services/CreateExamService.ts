import { getRepository } from 'typeorm';
import Exam from '../models/Exam';
import { ExamType } from '../interfaces';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  description?: string;
  type: ExamType;
}

class CreateExamService {
  public async execute({ name, description, type }: Request): Promise<Exam> {
    if (!name) {
      throw new AppError('Você deve informar um nome!');
    }

    if (type !== 'OFFLINE' && type !== 'ONLINE') {
      throw new AppError('Tipo inválido');
    }

    const examsRepository = getRepository(Exam);

    const exam = examsRepository.create({
      name,
      description,
      type,
    });

    await examsRepository.save(exam);

    return exam;
  }
}

export default CreateExamService;
