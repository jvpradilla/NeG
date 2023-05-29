import { PrismaClient } from "@prisma/client";
import { CharacterRepository } from "../../domain/CharacterRepository";
import { Character } from "../../domain/Character";
import { CharacterId } from "../../domain/CharacterId";

export class PostgreSQLCharacterRepository implements CharacterRepository {
  private prisma = new PrismaClient();

  public async findByCharacterId(pCharacterId: CharacterId): Promise<Character | undefined> {
    pCharacterId;
    return undefined;
  }

  public async save(pCharacter: Character): Promise<void> {
    await this.prisma.character.create({
      data: {
        id: pCharacter.id.value
      }
    });
  }
}