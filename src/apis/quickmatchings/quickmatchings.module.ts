import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { QuickMatching } from "./entities/quickmatchings.entity";
import { QuickMatchingController } from "./quickmatchings.controller";
import { QuickMatchingService } from "./quickmatchings.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuickMatching, User])],

  exports: [QuickMatchingService],
  controllers: [QuickMatchingController],
  providers: [QuickMatchingService, UsersService],
})
export class QuickMatchingModule {}
