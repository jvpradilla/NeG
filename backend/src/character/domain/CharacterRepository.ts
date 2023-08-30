import { Character } from "./Character";
import { CharacterId } from "./CharacterId";

export interface CharacterRepository {
  findByCharacterId(pCharacterId: CharacterId): Promise<Character | undefined>;
  save(pCharacter: Character): Promise<void>;
  update(pCharacter: Character): Promise<void>;
}