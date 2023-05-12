export class UserName {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("UserName cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("UserName cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("Username must be at least 6 characters");
    }
    if(this.validate(pValue) === false) {
      throw new Error("Username must only contain lowercase letters, numbers and underscore");
    }

    this.value = pValue;
  }

  equals(pUsername: UserName): boolean {
    return (this.value) === (pUsername.value);
  }

  private validate(pUsername: string): boolean {
    const regex = /^[a-z0-9_]+$/;
    return regex.test(pUsername);
  }
}