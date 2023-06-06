import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
  public readonly username: UserName;
  public readonly password: UserPassword;
  public readonly userPhotoURL: string;

  constructor(pUsername: UserName, pPassword: UserPassword, pUserPhotoURL?: string) {
    this.username = pUsername;
    this.password = pPassword;
    this.userPhotoURL = pUserPhotoURL ?? "";
  }

  equals(pUser: User): boolean {
    return (this.username.equals(pUser.username));
  }

}