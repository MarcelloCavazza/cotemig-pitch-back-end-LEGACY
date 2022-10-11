import { IChat, IChatUpdate } from "../dto/ChatDTO";

export interface IChatRespository {
  create(data: IChat): Promise<void>;
  update(data: IChat): Promise<IChatUpdate>;
  deleteById(id: string): Promise<void>;
  listById(id: string): Promise<IChat>;
  findRoomByName(room_name: string): Promise<IChat | boolean>;
}
