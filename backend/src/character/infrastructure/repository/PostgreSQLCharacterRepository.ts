import { PrismaClient } from "@prisma/client";
import { CharacterRepository } from "../../domain/CharacterRepository";
import { Character } from "../../domain/Character";
import { CharacterId } from "../../domain/CharacterId";

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
    return new Character(new CharacterId(result.id));
  }

  public async save(pCharacter: Character): Promise<void> {
    await this.prisma.character.create({
      data: {
        id: pCharacter.id.value
      }
    });
  }
}