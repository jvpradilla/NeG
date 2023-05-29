import { User } from "../domain/User";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";


export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(pUserName: UserName, pPassword: UserPassword, pUserPhotoURL?: string): Promise<void> {
    if (await this.userRepository.findByUserName(pUserName)) {
      throw new Error("User already exists");
    }
    await this.userRepository.save(new User(pUserName, pPassword, pUserPhotoURL));
  }
}
