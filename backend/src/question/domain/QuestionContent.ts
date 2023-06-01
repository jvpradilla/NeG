export class QuestionContent {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("QuestionContent cannot be empty or whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("QuestionContent must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pQuestionContent: QuestionContent): boolean {
    return (this.value) === (pQuestionContent.value);
  }
}