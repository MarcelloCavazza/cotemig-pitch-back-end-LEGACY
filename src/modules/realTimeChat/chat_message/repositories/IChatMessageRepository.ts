import { IChat } from "../dto/ChatMessageDTO";

export interface IChatRespository {
  create(data: IChat): Promise<void>;
  listbychatid(id: string, typeofuser: string): Promise<IChat[] | boolean>;
}
