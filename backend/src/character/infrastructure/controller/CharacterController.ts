import { CreateCharacter } from "../../application/CreateCharacter";
import { CharacterId } from "../../domain/CharacterId";
import { CharacterRepository } from "../../domain/CharacterRepository";

export class CharacterController {
  private createCharacter: CreateCharacter;

  constructor(pCharacterRepository: CharacterRepository) {
    this.createCharacter = new CreateCharacter(pCharacterRepository);
  }

  public async create(pCharacterId: string): Promise<void> {  
    const characterId = new CharacterId(pCharacterId);
    await this.createCharacter.execute(characterId);
  }
  
}