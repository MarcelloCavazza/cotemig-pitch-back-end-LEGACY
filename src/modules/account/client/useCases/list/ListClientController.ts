import { Request, Response } from "express";
import { ListClientUseCase } from "./ListClientUseCase";

export class ListClientController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listClientUseCase = new ListClientUseCase();
    const client = await listClientUseCase.listById(id);
    return response.status(200).json(client);
  }
}
