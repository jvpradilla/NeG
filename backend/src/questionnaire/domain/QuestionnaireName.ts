export class QuestionnaireName {
  public readonly value: string;

  constructor(pValue: string) {
    if(pValue === null || pValue === undefined || pValue.trim() === "") {
      throw new Error("QuestionnaireName cannot be empty or whitespace");
    }
    if (pValue.length < 6) {
      throw new Error("QuestionnaireName must be at least 6 characters");
    }
    this.value = pValue;
  }

  equals(pQuestionnaireName: QuestionnaireName): boolean {
    return (this.value) === (pQuestionnaireName.value);
  }

  private validate(pQuestionnaireName: string): boolean {
    const regex = /^[a-z0-9_]+$/;
    return regex.test(pQuestionnaireName);
  }
}