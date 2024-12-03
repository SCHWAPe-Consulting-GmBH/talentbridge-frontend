import { currentUserQuery } from "@/reaqtQuery/userQuery";
import { useQuery } from "@tanstack/react-query";

const ChatMessage = (props) => {
  const { data: currentUserId } = useQuery(currentUserQuery);
  const { text, senderId } = props.message;
  const isSent = senderId === currentUserId;
  const containerClass = isSent
    ? 'flex-row-reverse bg-green-500'
    : 'bg-medium-gray';
  // const imgClass = isSent ? 'ml-2' : 'mr-2';
  const textAlignClass = isSent ? 'text-right' : 'text-left';

  return (
    <div
      className={`flex shadow-md items-center ${containerClass} p-2 rounded-lg my-1 mx-3 max-w-xs md:max-w-md lg:max-w-lg ${isSent ? 'ml-auto' : 'mr-auto'}`}
    >
      {/* <img
        src={
          photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
        }
        alt="User Avatar"
        className={`rounded-full w-10 h-10 object-cover ${imgClass}`}
      /> */}
      <div className={`rounded-full w-10 h-10 object-cover `}>

      </div>
      <p className={`flex-1 text-sm text-white ${textAlignClass}`}>{text}</p>
    </div>
  );
};

export default ChatMessage;
