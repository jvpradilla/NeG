import { QuestionId } from "../../../question/domain/QuestionId";
import { CreateAnswer } from "../../application/CreateAnswer";
import { AnswerId } from "../../domain/AnswerId";
import { AnswerRepository } from "../../domain/AnswerRepository";

export class AnswerController {
  private createAnswer: CreateAnswer;

  constructor(pAnswerRepository: AnswerRepository) {
    this.createAnswer = new CreateAnswer(pAnswerRepository);
  }

  public async create(pAnswerId: string, pQuestionId: string, pAnswerVideoURL: string): Promise<void> {  
    const answerId = new AnswerId(pAnswerId);
    const questionId = new QuestionId(pQuestionId);
    await this.createAnswer.execute(answerId, questionId, pAnswerVideoURL);
  }
  
}