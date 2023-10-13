import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setuserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notificatons, setNotificatons] = useState([]);

  console.log("notifications", notificatons); 

  // socket

  useEffect(() => {
    const newSocket = io("https://chat-backend-lapv.onrender.com");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send Message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //recive message and notification

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some(id => id === res.senderId);

      if (isChatOpen) {
        setNotificatons(prev => [{...res, isRead:true}, ...prev]);
      } else {
        setNotificatons(prev => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  /* funcion para obtener los chats del usuario remitente*/
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users/find`);

      if (response.error) {
        return console.log("Error fetching users", response);
      }
      const pChats = response.users.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);
  /* funcion para obtener los chats del usuario que se encuentra logueado */
  useEffect(() => {
    const getUserChats = async () => {
      /* se valida el id del usuario */
      if (user?._id) {
        /* se setean carga de chats en verdadero y los errores en nulo */
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        /* se setea carga de  chats en falso */
        setIsUserChatsLoading(false);
        /* validamos si hay un error y lo regresamos */
        if (response.error) {
          return setUserChatsError(response);
        }
        /* si no hay errores se devuelve la respuesta obtenida */
        setuserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  /* effect para obtener los mensajes del chat actual */
  useEffect(() => {
    const getMessages = async () => {
      /* se setean carga de mensajes en verdadero y los errores en nulo */
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );
      /* se setea carga de  mensajes en falso */
      setIsMessagesLoading(false);
      /* validamos si hay un error y lo regresamos */
      if (response.error) {
        return setMessagesError(response);
      }
      /* si no hay errores se devuelve la respuesta obtenida */
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  /* funcion para actualizar chat que esta actualmente */
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
    console.log("chatcontext", chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setuserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notificatons,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
