import { LoginUser } from "../../application/LoginUser";
import { RegisterUser } from "../../application/RegisterUser";
import { User } from "../../domain/User";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserController {
  private registerUser: RegisterUser;
  private loginUser: LoginUser;

  constructor(pUserRepository : UserRepository) {
    this.registerUser = new RegisterUser(pUserRepository);
    this.loginUser = new LoginUser(pUserRepository);
  }

  public async register(pUserName: string, pPassword: string, pUserPhotoURL?: string): Promise<void> {
    const userName = new UserName(pUserName);
    const password = new UserPassword(pPassword);
    await this.registerUser.execute(userName, password, pUserPhotoURL);
  }

  public async login(pUserName: string, pPassword: string): Promise<User | undefined> {
    const userName = new UserName(pUserName);
    const password = new UserPassword(pPassword);
    return await this.loginUser.execute(userName, password);
  }
}
