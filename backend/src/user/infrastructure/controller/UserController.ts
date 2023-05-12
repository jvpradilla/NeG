import { RegisterUser } from "../../application/RegisterUser";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserController {
  private registerUser: RegisterUser;

  constructor(pUserRepository : UserRepository) {
    this.registerUser = new RegisterUser(pUserRepository);
  }

  public async register(pUserName: string, pPassword: string, pUserPhotoURL?: string): Promise<void> {
    const userName = new UserName(pUserName);
    const password = new UserPassword(pPassword);

    console.log("Desde userController");

    await this.registerUser.execute(userName, password, pUserPhotoURL);
  }
}
