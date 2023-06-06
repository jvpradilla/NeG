import { Router, Request, Response } from "express";
import { QuestionnaireRepository } from "../../domain/QuestionnaireRepository";
import { QuestionnaireController } from "../controller/QuestionnaireController";

export default class QuestionnaireRoutes {
  
  private repository: QuestionnaireRepository;
  private controller: QuestionnaireController;

  constructor(pRepository: QuestionnaireRepository) {
    this.repository = pRepository;
    this.controller = new QuestionnaireController(this.repository);
  }

  public registerRoutes(pPath: string, pRouter: Router): void {
    pRouter.get(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const quantity = pRequest.query.quantity as unknown as number;       
        const questionsData = await this.controller.readQuestionsByQuantity(quantity);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const questions: any [] = [];
        
        questionsData.forEach((question) => {
          questions.push({
            id: question.id.value,
            text: question.content.value,
            category: question.category.name.value
          });
        });
        
        pResponse.status(200).json({questions});
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });
  }
}