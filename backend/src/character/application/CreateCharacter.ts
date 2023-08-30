import { UserName } from "../../user/domain/UserName";
import { Character } from "../domain/Character";
import { CharacterId } from "../domain/CharacterId";
import { CharacterName } from "../domain/CharacterName";
import { CharacterRepository } from "../domain/CharacterRepository";

export class CreateCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pCharacterId: CharacterId, pCharacterName: CharacterName, pUserName:UserName): Promise<void> {
    if (await this.characterRepository.findByCharacterId(pCharacterId)) {
      throw new Error("Character already exists");
    }
    await this.characterRepository.save(new Character(pCharacterId, pCharacterName, pUserName));
  }
}