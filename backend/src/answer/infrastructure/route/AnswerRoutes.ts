import { Router, Request, Response } from "express";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
import { AnswerRepository } from "../../domain/AnswerRepository";
import { AnswerController } from "../controller/AnswerController";

export default class AnswerRoutes {

  private repository: AnswerRepository;
  private controller: AnswerController;

  constructor(pRepository: AnswerRepository) {
    this.repository = pRepository;
    this.controller = new AnswerController(this.repository);
  }

  public registerRoutes(pPath: string, pRouter: Router): void {

    pRouter.get(pPath + "/:characterid", async (pRequest: Request, pResponse: Response) => {
      try {
        const characterid = pRequest.params.characterid as string;  
        const result = await this.controller.findByCharacterId(characterid);
        const resultJSON = result.map((answer) => {   
          return {
            id: answer.id.value,
            characterId: answer.characterId.value,
            questionId: answer.questionId.value,   
            questionContent: answer.questionContent.value,         
            answerVideoURL: answer.answerVideoURL
          };
        });
        pResponse.status(200).json(resultJSON);
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

    pRouter.post(pPath + "/:characterid/video", async (pRequest: Request, pResponse: Response) => {
      const characterid = pRequest.params.characterid as string;  
      const uploadDir = `public/uploads/character/${characterid}`;
      const uploadPath = `${uploadDir}/${uuidv4()}.webm`;
      const uploadURL = `/${uploadPath}` ;
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFile(uploadPath, Buffer.from(pRequest.body), err => {
        if (null !== err) {
          return pResponse.status(500).send({ message : err });
        }
        return pResponse.status(200).json({ url: uploadURL});
      });
    });

    pRouter.post(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const { id, characterId, questionId, questionContent, answerVideoURL } = pRequest.body;
        await this.controller.create(id, characterId, questionId, questionContent, answerVideoURL);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });
  }
}