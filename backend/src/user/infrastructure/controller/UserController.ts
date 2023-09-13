import { ReadUser } from "../../application/ReadUser";
import { UpdateUser } from "../../application/UpdateUser";
import { LoginUser } from "../../application/LoginUser";
import { CreateUser } from "../../application/CreateUser";
import { User } from "../../domain/User";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";


export class UserController {
  private readUser: ReadUser;
  private createUser: CreateUser;
  private loginUser: LoginUser;
  private updateUser: UpdateUser;

  constructor(pUserRepository : UserRepository) {
    this.readUser = new ReadUser(pUserRepository);
    this.createUser = new CreateUser(pUserRepository);
    this.loginUser = new LoginUser(pUserRepository);
    this.updateUser = new UpdateUser(pUserRepository);
  }

  public async read(pUserName: string): Promise<User | undefined> {
    const userName = new UserName(pUserName);
    return await this.readUser.execute(userName);
  }

  public async create(pUserName: string, pPassword: string, pUserPhotoURL?: string): Promise<void> {
    const userName = new UserName(pUserName);
    const password = new UserPassword(pPassword);
    await this.createUser.execute(userName, password, pUserPhotoURL);
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
    await this.updateUser.execute(userName, password, passwordNew, pUserPhotoURLNew);
  }
}
