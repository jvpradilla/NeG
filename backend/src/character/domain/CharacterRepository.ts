import { Character } from "./Character";

export interface CharacterRepository {
  save(character: Character): Promise<void>;
}