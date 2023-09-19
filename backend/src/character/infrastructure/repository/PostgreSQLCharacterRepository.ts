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
        username: pCharacter.userName.value,
        avatar: pCharacter.characterAvatarURL
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
        published: pCharacter.published,
        avatar: pCharacter.characterAvatarURL
      }
    });
  }

  public async delete(pCharacterId: CharacterId): Promise<void> {
    await this.prisma.answer.deleteMany({
      where: {
        characterId: pCharacterId.value
      }
    });

    await this.prisma.character.delete({
      where: {
        id: pCharacterId.value
      }
    }); 
  }

  public async findByUserId(pUserId: UserName): Promise<Character[]> {
    const characters = await this.prisma.character.findMany({
      where: {
        username: pUserId.value,
        published: true
      }
    });
    return characters.map((character) => {
      return new Character(new CharacterId(character.id), new CharacterName(character.name), new UserName(character.username), character.published, character.avatar);
    });
  }

  public async findAll(): Promise<Character[]> {
    const characters = await this.prisma.character.findMany({
      where: {
        published: true
      }
    });
    return characters.map((character) => {
      return new Character(new CharacterId(character.id), new CharacterName(character.name), new UserName(character.username), character.published, character.avatar);
    });
  }
}