import { Character } from "../domain/Character";
import { CharacterId } from "../domain/CharacterId";
import { CharacterRepository } from "../domain/CharacterRepository";

export class CreateCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pCharacterId: CharacterId): Promise<void> {
    if (await this.characterRepository.findByCharacterId(pCharacterId)) {
      throw new Error("Character already exists");
    }
    await this.characterRepository.save(new Character(pCharacterId));
  }
}