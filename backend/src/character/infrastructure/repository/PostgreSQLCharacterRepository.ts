import { PrismaClient } from "@prisma/client";
import { CharacterRepository } from "../../domain/CharacterRepository";
import { Character } from "../../domain/Character";
import { CharacterId } from "../../domain/CharacterId";
import { CharacterName } from "../../domain/CharacterName";
import { UserName } from "../../../user/domain/UserName";

export class PostgreSQLCharacterRepository implements CharacterRepository {
  private prisma = new PrismaClient();

  public async findByCharacterId(pCharacterId: CharacterId): Promise<Character | undefined> {
    const result = await this.prisma.character.findUnique({
      where: {
        id: pCharacterId.value
      }
    });
    if (result === null || result === undefined) {
      return undefined;
    }
    return new Character(new CharacterId(result.id), new CharacterName(result.name), new UserName(result.username));
  }

  public async save(pCharacter: Character): Promise<void> {
    await this.prisma.character.create({
      data: {
        id: pCharacter.id.value,
        name: pCharacter.name.value,
        username: pCharacter.userName.value
      }
    });
  }

  public async update(pCharacter: Character): Promise<void> {
    await this.prisma.character.update({
      where: {
        id: pCharacter.id.value
      },
      data: {
        name: pCharacter.name.value,
        username: pCharacter.userName.value,
        published: pCharacter.published
      }
    });
  }
}