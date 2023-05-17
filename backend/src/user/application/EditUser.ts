import { User } from "../domain/User";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";


export class EditUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(pUserName: UserName, pPassword: UserPassword, pPasswordNew: UserPassword, pUserPhotoURLNew?: string): Promise<void> {
    const user = await this.userRepository.findByUserName(pUserName);
    if(user === undefined) {
      throw new Error("User not found");
    }
    if(!user.password.equals(pPassword)) { 
      throw new Error("User not found");
    }
    await this.userRepository.update(new User(pUserName, pPasswordNew, pUserPhotoURLNew));
  }
}