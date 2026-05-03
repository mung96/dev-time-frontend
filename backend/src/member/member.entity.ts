import { BaseModel } from '../common/base-model.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique('UQ_MEMBER_EMAIL', ['email'])
@Unique('UQ_MEMBER_NICKNAME', ['nickname'])
export class Member extends BaseModel {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: false, select: false })
  password: string;
}
