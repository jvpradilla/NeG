import { QuestionRepository } from "../../domain/QuestionRepository";
import { CreateQuestion } from "../../application/CreateQuestion";
import { QuestionContent } from "../../domain/QuestionContent";
import { QuestionId } from "../../domain/QuestionId";
import { Category } from "../../../category/domain/Category";
import { Questionnaire } from "../../../questionnaire/domain/Questionnaire";
import { ReadQuestions } from "../../application/ReadQuestions";
import { Question } from "../../domain/Question";

export class QuestionController {
  private createQuestion: CreateQuestion;
  private readQuestions: ReadQuestions;

  constructor(pQuestionRepository: QuestionRepository) {
    this.createQuestion = new CreateQuestion(pQuestionRepository);
    this.readQuestions = new ReadQuestions(pQuestionRepository);
  }

  public async create(pQuestionId: string, pQuestionContent: string, pCategory: Category, pQuestionnaire: Questionnaire): Promise<void> {  
    const questionId = new QuestionId(pQuestionId);
    const questionContent = new QuestionContent(pQuestionContent);
    await this.createQuestion.execute(questionId, questionContent, pCategory, pQuestionnaire);
  }

  public async readAll(): Promise<Question[]> {
    return await this.readQuestions.execute();
  }
}