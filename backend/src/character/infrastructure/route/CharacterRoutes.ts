import { Router, Request, Response } from "express";
import { CharacterRepository } from "../../domain/CharacterRepository";
import { CharacterController } from "../controller/CharacterController";

export default class CharacterRoutes {

  private repository: CharacterRepository;
  private controller: CharacterController;

  constructor(pRepository: CharacterRepository) {
    this.repository = pRepository;
    this.controller = new CharacterController(this.repository);
  }

  public registerRoutes(pPath: string, pRouter: Router): void {
    pRouter.post(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const { id } = pRequest.body;
        await this.controller.create(id);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

  }
}