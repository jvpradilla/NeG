import { User } from "./User";
import { UserName } from "./UserName";

export interface UserRepository {
  findByUserName(pUserName: UserName): Promise<User | undefined>;
  save(pUser: User): Promise<void>;
  update(pUser: User): Promise<void>;
}