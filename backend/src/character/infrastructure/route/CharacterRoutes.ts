import { Router, Request, Response } from "express";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
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

    pRouter.get(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const result = await this.controller.findAll();
        const resultJSON = result.map((character) => {
          return {
            id: character.id.value,
            name: character.name.value,
            username: character.userName.value,
            published: character.published
          };
        });
        pResponse.status(200).json(resultJSON);
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

    pRouter.get(pPath + "/:username/", async (pRequest: Request, pResponse: Response) => {
      try {
        const username = pRequest.params.username as string;        
        const result = await this.controller.findByUserID(username);
        const resultJSON = result.map((character) => {
          return {
            id: character.id.value,
            name: character.name.value,
            username: character.userName.value,
            published: character.published,
            avatar: character.characterAvatarURL
          };
        }); 
        pResponse.status(200).json(resultJSON);
      } catch (err) {
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    });

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
        const avatar = pRequest.body.avatar as string;

        await this.controller.publish(characterId, avatar);
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

    pRouter.post(pPath + "/:characterid/avatar", async (pRequest: Request, pResponse: Response) => {
  
      if (!pRequest.body.file) {
        return pResponse.status(400).json({ error: "No files were uploaded"});
      }

      const characterid = pRequest.params.characterid as string;  
      const uploadDir = `public/uploads/character/${characterid}`;
      const uploadPath = `${uploadDir}/${uuidv4()}.webp`;
      const uploadURL = `/${uploadPath}` ;
      
      const base64Data = pRequest.body.file.replace(/^data:image\/webp;base64,/, "");
      const buff = Buffer.from(base64Data, "base64");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(uploadPath, buff);
      pResponse.status(200).json({ url: uploadURL});
    });
  }
}