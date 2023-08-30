import { PrismaClient } from "@prisma/client";
import { Answer } from "../../domain/Answer";
import { AnswerId } from "../../domain/AnswerId";
import { AnswerRepository } from "../../domain/AnswerRepository";
import { QuestionId } from "../../../question/domain/QuestionId";
import { CharacterId } from "../../../character/domain/CharacterId";

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
    return new Answer(new AnswerId(result.id), new CharacterId(result.characterId), new QuestionId(result.questionId), result.answerVideoURL);
  }

  public async save(pAnswerId: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pAnswerVideoURL:string) {
    await this.prisma.answer.create({
      data: {
        id: pAnswerId.value,
        characterId: pCharacterId.value,
        questionId: pQuestionId.value,
        answerVideoURL: pAnswerVideoURL
      }
    });
  }
}