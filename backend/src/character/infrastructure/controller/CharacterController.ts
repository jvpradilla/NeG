import { UserName } from "../../../user/domain/UserName";
import { CreateCharacter } from "../../application/CreateCharacter";
import { DeleteCharacter } from "../../application/DeleteCharacter";
import { FindAllCharacter } from "../../application/FindAllCharacter";
import { FindByUserIDCharacter } from "../../application/FindByUserIDCharacter";
import { PublishCharacter } from "../../application/PublishCharacter";
import { Character } from "../../domain/Character";
import { CharacterId } from "../../domain/CharacterId";
import { CharacterName } from "../../domain/CharacterName";
import { CharacterRepository } from "../../domain/CharacterRepository";

export class CharacterController {
  private createCharacter: CreateCharacter;
  private publishCharacter: PublishCharacter;
  private deleteCharacter: DeleteCharacter;
  private findAllCharacter: FindAllCharacter;
  private findByUserIDCharacter: FindByUserIDCharacter;

  constructor(pCharacterRepository: CharacterRepository) {
    this.createCharacter = new CreateCharacter(pCharacterRepository);
    this.publishCharacter = new PublishCharacter(pCharacterRepository);
    this.deleteCharacter = new DeleteCharacter(pCharacterRepository);
    this.findAllCharacter = new FindAllCharacter(pCharacterRepository);
    this.findByUserIDCharacter = new FindByUserIDCharacter(pCharacterRepository);
  }

  public async create(pCharacterId: string, pCharacterName: string, pUserName: string): Promise<void> {  
    const characterId = new CharacterId(pCharacterId);
    const characterName = new CharacterName(pCharacterName);
    const userName = new UserName(pUserName);
    await this.createCharacter.execute(characterId, characterName, userName);
  }

  public async publish(pCharacterId: string): Promise<void> {
    const characterId = new CharacterId(pCharacterId);
    await this.publishCharacter.execute(characterId);
  }

  public async delete(pCharacterId: string): Promise<void> {
    const characterId = new CharacterId(pCharacterId);
    await this.deleteCharacter.execute(characterId);
  }    

  public async findAll(): Promise<Character[]> {
    return await this.findAllCharacter.execute();
  }

  public async findByUserID(pUserName: string): Promise<Character[]> {
    const userName = new UserName(pUserName);
    return await this.findByUserIDCharacter.execute(userName);
  }
}