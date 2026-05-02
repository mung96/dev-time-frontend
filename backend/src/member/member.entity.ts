import { BaseModel } from '../common/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Member extends BaseModel {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, unique: true })
  nickname: string;

  @Column({ nullable: false, unique: true })
  password: string;
}
