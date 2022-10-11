import { Request, Response } from "express";
import { ListAdminUseCase } from "./ListAdminUseCase";

export class ListAdminController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listAdminUseCase = new ListAdminUseCase();
    const admin = await listAdminUseCase.listById(id);
    return response.json(admin);
  }
}
