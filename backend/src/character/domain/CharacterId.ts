export class CharacterId {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("CharacterId cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("CharacterId cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("CharacterId must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pCharacterId: CharacterId): boolean {
    return (this.value) === (pCharacterId.value);
  }
}