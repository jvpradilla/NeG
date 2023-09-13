import { Character } from "../domain/Character";
import { CharacterRepository } from "../domain/CharacterRepository";

export class FindAllCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(): Promise<Character[]> {
    return await this.characterRepository.findAll();

  }
}