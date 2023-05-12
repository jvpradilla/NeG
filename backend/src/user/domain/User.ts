import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
  public readonly username: UserName;
  public readonly password: UserPassword;
  public readonly userPhotoURL: string;

  constructor(pUsername: UserName, pPassword: UserPassword, pUserPhotoURL?: string) {
    /*
    if(username === null || username === undefined) {
      throw new Error("username must be a valid UserName object");
    }
    if(password === null || password === undefined) {
      throw new Error("password must be a valid UserPassword object");
    }
    */
    this.username = pUsername;
    this.password = pPassword;
    this.userPhotoURL = pUserPhotoURL ?? "";
  }

  equals(pUser: User): boolean {
    return (this.username.equals(pUser.username));
  }

}