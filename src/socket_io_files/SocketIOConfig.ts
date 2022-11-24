import { Server } from "socket.io";
import { randomUUID } from "crypto";
import { CreateChatMessageUseCase } from "../../src/modules/realTimeChat/chat_message/useCases/create/CreateChatMessageUseCase";
import { CreateChatUseCase } from "../../src/modules/realTimeChat/chat/useCases/create/CreateChatUseCase";
import { ListChatUseCase } from "../../src/modules/realTimeChat/chat/useCases/list/ListChatUseCase";
import { IChat } from "../../src/modules/realTimeChat/chat/dto/ChatDTO";
import { IRecieveCreateChatData } from "../../src/modules/realTimeChat/chat_message/dto/ChatMessageDTO";
import { ListChatMessageUseCase } from "../modules/realTimeChat/chat_message/useCases/list/ListChatMessageUseCase";

const createChatDB = async (data: IChat) => {
  const create_class = new CreateChatUseCase();
  return await create_class.create(data);
};

const insertMessageDB = async (data: IRecieveCreateChatData) => {
  const insert_class = new CreateChatMessageUseCase();
  return await insert_class.create(data);
};

const getChatByName = async (name: string) => {
  const chat_class = new ListChatUseCase();
  return await chat_class.findRoomByName(name);
};

const listMessagesDb = async (chat_id) => {
  const messages = new ListChatMessageUseCase();
  return messages.listbychatid(chat_id)
}

const socket_io = new Server(4000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socket_io.on("connection", (socket) => {
  const room_name = socket.handshake.query.room_name,
    chat_result_promise = getChatByName(String(room_name));
  chat_result_promise.then(async (result) => {
    const message_queue = [];
    if (!result) {
      const chat_info = {
        id: randomUUID(),
        room_name: String(room_name),
        clientId: String(socket.handshake.query.idClient),
        lawyerId: String(socket.handshake.query.idLawyer),
        is_active: "true",
        created_at: String(Date.now()),
      };
      await createChatDB(chat_info);
    };
    socket.join(room_name);
    console.log(`Socket ${socket.id} connected to ${room_name}`);
    const formated_result = <IChat>result;
    if(result.valueOf != Boolean){
      listMessagesDb(formated_result.id).then((messages) => {
        socket_io.to(socket.id).emit("retriveHistory", messages)
      })
    }
    /*socket.on("requestHistory", (e) => {
      console.log(e)
      console.log("get your history")
      if (result.valueOf != Boolean) {
        const formated_result = <IChat>result
        listMessagesDb(formated_result.id).then((messages) => {
          
        })
      }
    })*/
    socket.on("clientMessage", (msg) => {
      if (result.valueOf != Boolean) {
        //console.log(result);
        const data = {
            chat_id: formated_result.id,
            message_content: msg.message,
            sender_id: msg.sender_id,
          };
          //console.log(data)
        message_queue.push(data)
        while(message_queue.length > 0){
          const to_insert = message_queue.shift()
          insertMessageDB(to_insert).then((e) => { // 
              socket_io.to(room_name).emit("serverResponse", to_insert)
          })
        }
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
      socket.disconnect()
    })
  });
});

export { socket_io };
