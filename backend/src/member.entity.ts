import { BaseModel } from 'src/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Member extends BaseModel {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: false })
  password: string;
}
