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
        const { id, name, username } = pRequest.body;
        await this.controller.create(id, name, username);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

    pRouter.put(pPath + "/:characterId/", async (pRequest: Request, pResponse: Response) => {
      try {
        const characterId = pRequest.params.characterId as string;
        await this.controller.publish(characterId);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

    pRouter.delete(pPath + "/:characterId/", async (pRequest: Request, pResponse: Response) => {
      try {
        const characterId = pRequest.params.characterId as string;
        await this.controller.delete(characterId);
        pResponse.status(200).send();
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });
  }
}