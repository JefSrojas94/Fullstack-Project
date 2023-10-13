import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  /* obtengo el id del destinatario con el hook que cree */
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.User._id) 
 /*  console.log("recipient",recipientUser.User._id)
  console.log("User",user._id)
 */
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name"> {recipientUser?.User.user_name} </div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">10/8/2023</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnline? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
