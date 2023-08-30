import { Character } from "../domain/Character";
import { CharacterId } from "../domain/CharacterId";
import { CharacterRepository } from "../domain/CharacterRepository";

export class PublishCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pCharacterId: CharacterId): Promise<void> {
    const character = await this.characterRepository.findByCharacterId(pCharacterId);
    if (character) {
      await this.characterRepository.update(new Character(character.id, character.name, character.userName, true));
    } else {  
      throw new Error("Character not exists");
    }
  }
}