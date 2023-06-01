export class QuestionId {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("QuestionId cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("QuestionId cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("QuestionId must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pQuestionId: QuestionId): boolean {
    return (this.value) === (pQuestionId.value);
  }
}