import { Question } from "../../domain/Question";
import { QuestionId } from "../../domain/QuestionId";
import { QuestionRepository } from "../../domain/QuestionRepository";

export class MockQuestionRepository implements QuestionRepository{

  private questions: Question[] = [];

  public async findByQuestionId(pQuestionId: QuestionId): Promise<Question | undefined> {
    return await this.questions.find((Question) => Question.id.equals(pQuestionId)); 
  }

  public async save(pQuestion: Question): Promise<void> {
    this.questions.push(pQuestion);
  }   
  
  public async findAll(): Promise<Question[]> {
    return this.questions;
  }
}