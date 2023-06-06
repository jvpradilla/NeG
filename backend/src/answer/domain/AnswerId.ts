export class AnswerId {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("AnswerId cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("AnswerId cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("AnswerId must be at least 6 characters");
    }
    this.value = pValue;
  }
  
  equals(pAnswerId: AnswerId): boolean {
    return (this.value) === (pAnswerId.value);
  }
}