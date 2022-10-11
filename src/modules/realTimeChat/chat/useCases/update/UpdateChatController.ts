import { Request, Response } from "express";
import { UpdateChatUseCase } from "./UpdateChatUseCase";

export class UpdateChatController {
  public async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { is_active, email, password, token } = request.body;
    const updateUseCase = new UpdateChatUseCase();

    await updateUseCase.updateById({
      id,
      is_active,
    });

    return response.json("Auth updated");
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    const updateUseCase = new UpdateChatUseCase();

    await updateUseCase.deleteById(id);

    return response.json("chat deleted");
  }
}
