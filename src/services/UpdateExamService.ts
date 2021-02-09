import { getRepository, UpdateResult } from 'typeorm';
import { anyNonNil } from 'is-uuid';
import Exam from '../models/Exam';
import { ExamType } from '../interfaces';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  description?: string;
  type: ExamType;
}

class UpdateExamService {
  public async execute({
    id,
    name,
    description,
    type,
  }: Request): Promise<UpdateResult> {
    const examsRepository = getRepository(Exam);

    if (!anyNonNil(id)) {
      throw new AppError('UUID inválido');
    }

    const item = await examsRepository.findOne(id);

    if (!item) {
      throw new AppError('Exame não existe');
    }

    if (!name) {
      throw new AppError('Você deve informar um nome!');
    }

    if (type !== 'OFFLINE' && type !== 'ONLINE') {
      throw new AppError('Tipo inválido');
    }

    const exam = await examsRepository.update(id, {
      name,
      description,
      type,
    });

    return exam;
  }
}

export default UpdateExamService;
