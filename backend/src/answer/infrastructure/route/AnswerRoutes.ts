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

    pRouter.post(pPath + "/video", async (pRequest: Request, pResponse: Response) => {
      const uploadPath = `public/uploads/character/${uuidv4()}.webm`;
      const uploadURL = `/${uploadPath}` ;
      fs.writeFile(uploadPath, Buffer.from(pRequest.body),err => {
        if (null !== err) {
          return pResponse.status(500).send({ message : err });
        }
        return pResponse.status(200).json({ url: uploadURL});
      });
    });

    pRouter.post(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const { id, questionId, answerVideoURL } = pRequest.body;
        await this.controller.create(id, questionId, answerVideoURL);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });
  }
}