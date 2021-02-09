import { getRepository } from 'typeorm';
import Exam from '../models/Exam';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteExamService {
  public async execute({ id }: Request): Promise<void> {
    const examsRepository = getRepository(Exam);

    const item = await examsRepository.findOne(id);

    if (!item) {
      throw new AppError('Exame não existe');
    }

    await examsRepository.remove(item);
  }
}

export default DeleteExamService;
