export class QuestionnaireId {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("QuestionnaireId cannot be empty or whitespace");
    }
    if(pValue.includes(" ")) {
      throw new Error("QuestionnaireId cannot contain whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("QuestionnaireId must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pQuestionnaireId: QuestionnaireId): boolean {
    return (this.value) === (pQuestionnaireId.value);
  }
}