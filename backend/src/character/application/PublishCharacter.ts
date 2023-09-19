import { Character } from "../domain/Character";
import { CharacterId } from "../domain/CharacterId";
import { CharacterRepository } from "../domain/CharacterRepository";

export class PublishCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pCharacterId: CharacterId, pCharacterAvatarURL: string): Promise<void> {
    const character = await this.characterRepository.findByCharacterId(pCharacterId);
    if (character) {
      const newCharacter = new Character(character.id, character.name, character.userName, true, pCharacterAvatarURL);
      await this.characterRepository.update(newCharacter);
    } else {  
      throw new Error("Character not exists");
    }
  }
}