import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const email = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (email) {
      throw new ConflictException("이미 가입한 email입니다.");
    }

    const user = this.userRepository.create(createUserDto);
    user.password = createUserDto.password;
    await this.userRepository.save(user);
    return {
      status: {
        code: 200,
        message: "회원가입 성공!",
      },
    };
  }
  findAll() {
    return `This action returns all users`;
  }

  async findOneEmail({ email }) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOnePhone({ phone }: { phone: string }): Promise<string> {
    const user = await this.userRepository.findOneBy({ phone });
    return user.phone;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
