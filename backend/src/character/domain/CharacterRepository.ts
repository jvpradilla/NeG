import { UserName } from "../../user/domain/UserName";
import { Character } from "./Character";
import { CharacterId } from "./CharacterId";

export interface CharacterRepository {
  findByCharacterId(pCharacterId: CharacterId): Promise<Character | undefined>;
  findByUserId(pUserId: UserName): Promise<Character[]>;
  findAll(): Promise<Character[]>;
  save(pCharacter: Character): Promise<void>;
  update(pCharacter: Character): Promise<void>;
  delete(pCharacterId: CharacterId): Promise<void>;
}