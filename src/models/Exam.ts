import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EXAM_TYPE } from '../interfaces';

@Entity('exams')
class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ['ONLINE', 'OFFLINE'],
  })
  type: EXAM_TYPE;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exam;
