import { UserName } from "../../user/domain/UserName";
import { Character } from "../domain/Character";
import { CharacterRepository } from "../domain/CharacterRepository";

export class FindByUserIDCharacter {
  constructor(private readonly characterRepository : CharacterRepository) {}

  public async execute(pUserName:UserName): Promise<Character[]> {
    return await this.characterRepository.findByUserId(pUserName);

  }
}