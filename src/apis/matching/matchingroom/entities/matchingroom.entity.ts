import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MatchingChat } from "../../matchingchat/entities/matchingchat.entity";
import {
  AgeGroup,
  Gender,
  QuickMatching,
} from "../../quickmatchings/entities/quickmatchings.entity";

@Entity()
export class MatchingRoom {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  @ApiProperty({ description: "매칭 여부" })
  isMatched: boolean;

  @ApiProperty({ description: "매칭 요청일" })
  @CreateDateColumn()
  createdAt: Date;

  // @ApiProperty({ description: "매칭 취소일 / 거절일" })
  // @DeleteDateColumn({ nullable: true })
  // deletedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @ApiProperty({ description: "매칭룸에서 제거일" })
  removalDate: Date;

  @Column({ type: "enum", enum: Gender, nullable: true })
  @ApiProperty({ description: "원하는 상대방의 성별" })
  requestGender: Gender;

  @Column({ type: "enum", enum: AgeGroup, nullable: true })
  @ApiProperty({ description: "원하는 상대방의 나이대" })
  requestAgeGroup: AgeGroup;

  // @Column({ nullable: true })
  // @ApiProperty({ description: "매칭 대기 시작 시간" })
  // waitingStart: Date;

  // @Column({ nullable: true })
  // @ApiProperty({ description: "매칭 대기 종료 시간" })
  // waitingEnd: Date;

  // @OneToOne(() => QuickMatching, (quickMatching) => quickMatching.m)
  // @JoinColumn({ name: "gender" })
  // gender: QuickMatching; // 여기서 유저 정보 가져오기

  @OneToOne(() => QuickMatching, (quickMatching) => quickMatching.matchingRoom)
  @JoinColumn({ name: "quickMatchingId" })
  quickMatching: QuickMatching; // 여기서 유저 정보 가져오기

  @OneToOne(() => MatchingChat, (matchingChat) => matchingChat.matchingRoom)
  @JoinColumn({ name: "matchingChatId" })
  matchingChat: MatchingChat;

  @OneToOne(() => User, (targetUser) => targetUser.matchingRoom)
  @JoinColumn({ name: "targetUserId" })
  targetUser: User;
}
// 대기 시간 설정 메서드
// setWaitingTime(waitingHours: number) {
//   this.waitingStart = new Date();  // 대기 시작 시간을 현재 시간으로 설정
//   this.waitingEnd = new Date();
//   this.waitingEnd.setHours(this.waitingEnd.getHours() + waitingHours);  // 대기 시작 시간으로부터 대기 시간만큼 추가하여 대기 종료 시간 설정
// }