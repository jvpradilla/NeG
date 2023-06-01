import { User } from "../../domain/User";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";

export class MockUserRepository implements UserRepository {
  
  
  private users: User[] = [];

  public async findByUserName(pUserName: UserName): Promise<User | undefined> {
    return this.users.find((user) => user.username.value === pUserName.value);
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }

  public async update(pUser: User): Promise<void> {
    pUser;
    throw new Error("Method not implemented.");
  }
}