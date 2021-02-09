/* eslint-disable no-param-reassign */
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { anyNonNil } from 'is-uuid';

import Question from '../models/Question';
import AppError from '../errors/AppError';
import Option from '../models/Option';

interface GetByExamParams {
  exam_id: string;
}

function shuffle(array: string[]) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

@EntityRepository(Question)
class QuestionsRepository extends Repository<Question> {
  public async getByExam({ exam_id }: GetByExamParams): Promise<unknown> {
    const optionsRepository = getRepository(Option);

    if (!anyNonNil(exam_id)) {
      throw new AppError('UUID inválido');
    }

    const getAllByExam = await this.find({ where: { exam_id } });

    const withOptions = Promise.all(
      await getAllByExam.map(async question => {
        const options = await optionsRepository.find({
          where: { question_id: question.id },
        });

        const letters = [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
        ];
        const optionsLetters = letters.splice(0, options.length);
        const letter = shuffle(optionsLetters);

        const optionsWithKey = options.map((option, i) => {
          return {
            ...option,
            key: letter[i],
          };
        });

        return {
          ...question,
          options: optionsWithKey.sort((a, b) => a.key.localeCompare(b.key)),
        };
      }),
    );

    return withOptions;
  }
}

export default QuestionsRepository;
