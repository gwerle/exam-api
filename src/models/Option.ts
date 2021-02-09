import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Question from './Question';

@Entity('options')
class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'id' })
  question: Question;

  @Column()
  question_id: string;

  @Column()
  value: string;

  @Column()
  correct: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Option;
