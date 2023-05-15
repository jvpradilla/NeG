import { User } from "../domain/User";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";


export class LoginUser {

  constructor(private readonly userRepository: UserRepository) {}

  public async execute(pUserName: UserName, pPassword: UserPassword): Promise<User | undefined> {
    
    const user = await this.userRepository.findByUserName(pUserName);
    if(user === undefined) {
      return undefined;
    }
    if(user.password.equals(pPassword)) { 
      return user;
    }
    return undefined;  
  }

}