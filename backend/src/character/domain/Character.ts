import { CharacterId } from "./CharacterId";

export class Character {
  public readonly id: CharacterId;

  constructor(pId: CharacterId) {
    this.id = pId;
  } 
}