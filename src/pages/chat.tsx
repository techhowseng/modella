import io from "socket.io-client";
import { useState, useEffect } from "react";
import axiosInstance from "lib/axiosInstance";
import { useGetUserDetails } from "features/hooks";

let socket;

type Message = {
  author: string;
  message: string;
};

export default function Home() {
  const { user } = useGetUserDetails();
  const [username, setUsername] = useState("");
  const [models, setModels] = useState([]);
  const [chatId, setChatId] = useState(1);
  const [chatWindow, setChatWindow] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
  }, [user]);

  const socketInitializer = async () => {
    await axiosInstance.get("/chat");
    const models = await axiosInstance.get("/models");
    console.log("user------", user)
    setModels(models.data);
    if (user.type == "Model") {
      setChatWindow(true)
    }

    socket = io();

    if (user.id) socket.emit("createSocket",user)


    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.userId, message: msg.message },
      ]);
    });

    socket.on('invite', function(data: object) {
      console.log("in invite")
      socket.emit("joinRoom",data)
    });

    socket.on('message', function(msg) {
      console.log("receiving message", msg)
      setChatWindow(true);
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.from.id, message: msg.message },
      ]);
    });
  };

  const initiateChat = async (model) => {
    console.log("initiate0000000-------------")
    let data = {
      clientId: user.id,
      modelId: model.id
    }
    // const chat = await axiosInstance.post("/chat", data);

    // const randomChatId = Math.ceil(Math.random() * 100);
    const randomChatId = 1
    setChatId(randomChatId);
    console.log("chat id----", randomChatId)
    socket.emit('create', {chatId: randomChatId, userId: user.userId, withUserId: model.userId});
    setChatWindow(true);
  }

  const sendMessage = async (message: string) => {
    const data = {
      chatId,
      message,
      user
    }
    console.log("send message")
    // each chat window should be attached to a chat ID
    socket.emit("message", {chatId, message, from: user});
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: user.id, message },
    ]);
    // const response = await axiosInstance.post("/chat/1", data);
    // if response is success, then message should show delivered
    // else show undelivered
    setMessage("");
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage(message);
      }
    }
  };

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        { !chatWindow && models.length > 0 && 
          <>          
          {models.map((model, i) => {
            return (
              <div
                key={i}
              >
                <button
                  onClick={() => {
                    initiateChat(model);
                  }}
                  className="bg-white rounded-md px-4 py-2 text-xl"
                  >
                  {model.firstname}
                </button>
              </div>
            );
          })}
          </>
        }
        {
          chatWindow && 
          <>
            <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
              <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                    <button
                      className="group-hover:text-white px-3 h-full"
                      onClick={() => {
                        setChatWindow(false);
                      }}
                    >
                      close
                    </button>
              </div>
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b border-gray-200"
                      key={i}
                    >
                      {msg.author} : {msg.message}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    className="group-hover:text-white px-3 h-full"
                    onClick={() => {
                      sendMessage(message);
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        }
        {/* {console.log("user-----------", user)} */}
      </main>
    </div>
  );
}