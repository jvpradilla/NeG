export class CategoryId {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("CategoryId cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("CategoryId cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("CategoryId must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pCategoryId: CategoryId): boolean {
    return (this.value) === (pCategoryId.value);
  }
}