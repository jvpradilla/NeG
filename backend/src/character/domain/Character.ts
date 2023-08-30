import { CharacterId } from "./CharacterId";
import { CharacterName } from "./CharacterName";
import { UserName } from "../../user/domain/UserName";

export class Character {
  public readonly id: CharacterId;
  public readonly name: CharacterName;
  public readonly userName: UserName;
  public readonly published: boolean;

  constructor(pId: CharacterId, pCharacterName: CharacterName, pUserName: UserName, pPublished = false) {
    this.id = pId;
    this.name = pCharacterName;
    this.userName = pUserName;
    this.published = pPublished;
  } 
}