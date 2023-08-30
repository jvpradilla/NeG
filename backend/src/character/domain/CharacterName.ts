export class CharacterName {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("CharacterName cannot be empty or whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("CharacterName must be at least 6 characters");
    }

    this.value = pValue;
  }

  equals(pCharacterName: CharacterName): boolean {
    return (this.value) === (pCharacterName.value);
  }
}