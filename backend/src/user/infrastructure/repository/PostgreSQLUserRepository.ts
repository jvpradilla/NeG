import { User } from "../../domain/User";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { PrismaClient } from "@prisma/client";

export class PostgreSQLUserRepository implements UserRepository {
  
  private prisma = new PrismaClient();

  public async findByUserName(pUserName: UserName): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: {
        username: pUserName.value
      }
    });

    if (result === null || result === undefined) {
      return undefined;
    }
    if (!result.userPhotoURL) {
      return new User(new UserName(result.username), new UserPassword(result.password));
    }
    return new User(new UserName(result.username), new UserPassword(result.password), result.userPhotoURL);  
  }

  public async save(pUser: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        username: pUser.username.value,
        password: pUser.password.value,
        userPhotoURL: pUser.userPhotoURL
      },
    });
  }

  public async update(pUser: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        username: pUser.username.value
      },
      data: {
        password: pUser.password.value,
        userPhotoURL: pUser.userPhotoURL
      }
    });  
  }
}
