import { CharacterId } from "../domain/CharacterId";
import { CharacterRepository } from "../domain/CharacterRepository";

export class DeleteCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pCharacterId: CharacterId): Promise<void> {
    const character = await this.characterRepository.findByCharacterId(pCharacterId);
    if (character) {
      await this.characterRepository.delete(character.id);
    } else {  
      throw new Error("Character not exists");
    }
  }
}