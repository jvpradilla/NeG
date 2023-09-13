import { User } from "../domain/User";
import { UserName } from "../domain/UserName";
import { UserRepository } from "../domain/UserRepository";


export class ReadUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(pUserName: UserName): Promise<User | undefined> {
    return await this.userRepository.findByUserName(pUserName);
  }
}
