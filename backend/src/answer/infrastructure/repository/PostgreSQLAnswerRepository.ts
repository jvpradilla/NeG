import { PrismaClient } from "@prisma/client";
import { Answer } from "../../domain/Answer";
import { AnswerId } from "../../domain/AnswerId";
import { AnswerRepository } from "../../domain/AnswerRepository";
import { QuestionId } from "../../../question/domain/QuestionId";
import { CharacterId } from "../../../character/domain/CharacterId";
import { QuestionContent } from "../../../question/domain/QuestionContent";

export class PostgreSQLAnswerRepository implements AnswerRepository {
 
  private prisma = new PrismaClient();

  public async findByAnswerId(pAnswerId: AnswerId): Promise<Answer | undefined> {
    const result = await this.prisma.answer.findUnique({
      where: {
        id: pAnswerId.value
      }
    });
    if (result === null || result === undefined) {
      return undefined;
    }
    return new Answer(new AnswerId(result.id), new CharacterId(result.characterId), new QuestionId(result.questionId), new QuestionContent(""), result.answerVideoURL);
  }

  public async save(pAnswerId: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pQuestionContent: QuestionContent, pAnswerVideoURL:string) {
    await this.prisma.answer.create({
      data: {
        id: pAnswerId.value,
        characterId: pCharacterId.value,
        questionId: pQuestionId.value,
        questionContent: pQuestionContent.value,
        answerVideoURL: pAnswerVideoURL
      }
    });
  }

  public async findByCharacterId(pCharacterId: CharacterId): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        characterId: pCharacterId.value
      }
    });
    return answers.map((answer) => {
      return new Answer(new AnswerId(answer.id), new CharacterId(answer.characterId), new QuestionId(answer.questionId), new QuestionContent(answer.questionContent), answer.answerVideoURL);
    });
  }
}