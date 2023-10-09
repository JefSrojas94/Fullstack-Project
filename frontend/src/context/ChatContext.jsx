import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setuserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

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

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
