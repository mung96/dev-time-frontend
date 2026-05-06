import { BaseModel } from 'src/common/base-model.entity';
import { Member } from 'src/member/member.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class MemberSession extends BaseModel {
  @ManyToOne(() => Member)
  member: Member;

  @Column({ nullable: false })
  refreshToken: string;

  @Column({ nullable: false })
  expiredAt: Date;
}
