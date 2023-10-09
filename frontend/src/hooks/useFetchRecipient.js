import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  /* obtenemos id destinatario */
  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      /* validamos que halla un id para hacer la busqueda */
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(response);
      }
      /* si no hay errores al buscar el id del otro usuario seteamos la respuesta y regresamos el valor*/
      setRecipientUser(response);
    };
    getUser();
  }, []);

  return { recipientUser };
};
