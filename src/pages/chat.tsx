import io from "socket.io-client";
import { useState, useEffect } from "react";
import axiosInstance from "lib/axiosInstance";
import { useGetUserDetails } from "features/hooks";

const socket = io('http://localhost:3001');

export default function Chat() {
  const { user } = useGetUserDetails();
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatWindow, setChatWindow] = useState(false);
  const [chatId, setChatId] = useState(1);
  const [currentChatter, setCurrentChatter] = useState(null);
  const [chatBlock, setChatBlock] = useState();


  useEffect(() => {
    socketInitializer();
    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [user]);

  const socketInitializer = async () => {
    const unreadChats = await axiosInstance.get("/chat");
    let response;
    if (user.type == "Client") {
      response = await axiosInstance.get("/models");
    } else if (user.type == "Model") {
      response = await axiosInstance.get("/client");
    }
    setChatUsers(response?.data);
    response?.data.map((model, i) => {
      socket.emit('addChatUser', model.userId);
    });
  }

  const handleMessage = (msgBox) => {
    setMessages((prevMessages) => [...prevMessages, 
      { author: msgBox.author,
        message: msgBox.message, 
        chatId: msgBox.chatId },
    ]);
  };

  socket.on('invite', function(data: object) {
    socket.emit("joinRoom",data)
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = inputValue.trim();
    if (message !== '') {
      let data = {
        clientId: user.id,
        modelId: currentChatter.id,
        chatId,
        user,
        message
      }
      socket.emit('sendMessage', data);
      setInputValue('');
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (inputValue) {
        handleSubmit(e)
      }
    }
  };

  const handleSelectUser = async (model) => {
    setChatWindow(true);
    let data = {
      modelId: model.id,
      clientId: user.id,
    }
    const response = await axiosInstance.post("/chat", data);
    setChatId(response.data.id);
    data["chatId"] = response.data.id;

    socket.emit('createRoom', data);
    setCurrentChatter(model);
  };

  return (
    
    <div>
      {chatUsers && chatUsers.length > 0 && chatUsers.map((user) => (
        <option onClick={() => {handleSelectUser(user)}}
          key={user.id}
          value={user.id}>
          {user.firstname || user.companyName}
        </option>
      ))}
      {
        chatWindow &&
        <>
          <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">

            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
            <h3> Chat with {currentChatter ? currentChatter.firstname : "This user."}</h3>

              <button
                className="group-hover:text-white px-3 h-full"
                onClick={() => {
                  setChatWindow(false);
                }}> Close
              </button>
              </div>
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.filter(message => message.chatId == currentChatter.userId).map(filteredMsg => (
                  <li>{filteredMsg.author}: {filteredMsg.message}</li>
                )
                )}
              </div>
              <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={inputValue}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    className="group-hover:text-white px-3 h-full"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
        </>
      }
    </div>
  );
}
