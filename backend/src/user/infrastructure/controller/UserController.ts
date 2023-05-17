import { EditUser } from "../../application/EditUser";
import { LoginUser } from "../../application/LoginUser";
import { RegisterUser } from "../../application/RegisterUser";
import { User } from "../../domain/User";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserController {
  private registerUser: RegisterUser;
  private loginUser: LoginUser;
  private editUser: EditUser;

  constructor(pUserRepository : UserRepository) {
    this.registerUser = new RegisterUser(pUserRepository);
    this.loginUser = new LoginUser(pUserRepository);
    this.editUser = new EditUser(pUserRepository);
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

  public async update(pUserName: string, pPassword: string, pPasswordNew: string, pUserPhotoURLNew?: string): Promise<void> {
    const userName = new UserName(pUserName);
    const password = new UserPassword(pPassword);
    const passwordNew = new UserPassword(pPasswordNew);
    await this.editUser.execute(userName, password, passwordNew, pUserPhotoURLNew);
  }
}
