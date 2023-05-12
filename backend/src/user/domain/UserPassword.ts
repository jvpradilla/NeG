export class UserPassword {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("UserPassword cannot be empty or whitespace");
    }
    if (pValue.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    this.value = pValue;
  }

  equals(pPassword: UserPassword): boolean {
    return (this.value) === (pPassword.value);
  }
}
