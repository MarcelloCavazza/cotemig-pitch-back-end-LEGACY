import { Request, Response } from "express";
import { ListChatUseCase } from "./ListChatUseCase";
import { socket_io as io } from "../../../../../socket_io_files/SocketIOConfig";


export class ListChatController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listById(id);
    return response.json(chat);
  }

  public async listbyclient(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listbyclient(id);
    return response.json(chat);
  }
  public async listbylawyer(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listbylawyer(id);
    return response.json(chat);
  }

  public async findRoomByName(request: Request, response: Response) {
    const { name } = request.params;
    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.findRoomByName(name);
    return response.json(chat);
  }

  public async getAllRooms(request: Request, response: Response) {
    const sockets_object = io.sockets,
    sockets = Object.keys(Object.fromEntries(sockets_object.sockets)),
    all_rooms = Object.keys(Object.fromEntries(sockets_object.adapter.rooms)),
    filtered_rooms = all_rooms.filter((room) => !sockets.includes(room))
    return response.status(200).send(JSON.stringify({
      status: 200,
      rooms: filtered_rooms
    }))
  }
}
