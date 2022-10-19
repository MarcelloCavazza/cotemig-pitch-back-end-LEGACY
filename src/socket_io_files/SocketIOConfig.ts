import {Server} from "socket.io"
import { randomUUID } from "crypto"
import { CreateChatMessageUseCase } from "../../src/modules/realTimeChat/chat_message/useCases/create/CreateChatMessageUseCase"
import { CreateChatUseCase } from "../../src/modules/realTimeChat/chat/useCases/create/CreateChatUseCase"
import { ListChatUseCase } from "../../src/modules/realTimeChat/chat/useCases/list/ListChatUseCase"
import { IChat } from "../../src/modules/realTimeChat/chat/dto/ChatDTO"
import { IRecieveCreateChatData } from "../../src/modules/realTimeChat/chat_message/dto/ChatMessageDTO"

const createChatDB = async (data : IChat) => {
  const create_class = new CreateChatUseCase()
  return await create_class.create(data)
}

const insertMessageDB = async (data : IRecieveCreateChatData) => {
  const insert_class = new CreateChatMessageUseCase();
  return await insert_class.create(data)
}

const getChatByName = async (name : string) => {
  const chat_class = new ListChatUseCase()
  return await chat_class.findRoomByName(name)
}

const socket_io = new Server(4000, {
  cors: {
    origin: "http://localhost:5173"
  }
});

socket_io.on("connection", (socket) => {
    const room_name = socket.handshake.query.room_name,
    chat_result_promise = getChatByName(String(room_name));
    chat_result_promise.then(async (result) => {
      if(!result){
        const chat_info = {
          id: randomUUID(),
          room_name: String(room_name),
          clientId: String("f87eb9fc-f80b-46f0-b01c-8c3cb7dfd9b1"),
          lawyerId: String("1e24aed9-e2a4-4b93-a556-4f0fe810b2b7"),
          is_active: "true",
          created_at: String(Date.now())
        }
        await createChatDB(chat_info)
        console.log("aqui")
      }
      socket.join(room_name)
      console.log(`Socket ${socket.id} connected to ${room_name}`);
      socket.on("clientMessage", (msg) => {
        if(result.valueOf != Boolean){
          const formated_result = <IChat> result,
          data = {
            chat_id : formated_result.id,
            message_content: msg.message,
            sender_id: "f87eb9fc-f80b-46f0-b01c-8c3cb7dfd9b1"
          }
          insertMessageDB(data).then((result) => {
            console.log(result)
            console.log(msg)
            socket_io.to(room_name).emit("serverResponse", msg)
          })  
        }
      })
    })
})

export {socket_io}
