export class CategoryName {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("CategoryName cannot be empty or whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("CategoryName must be at least 6 characters");
    }

    this.value = pValue;
  }

  equals(pCategoryName: CategoryName): boolean {
    return (this.value) === (pCategoryName.value);
  }

  private validate(pCategoryName: string): boolean {
    const regex = /^[a-z0-9_]+$/;
    return regex.test(pCategoryName);
  }
}