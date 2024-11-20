import { auth } from '@/firebase/config';

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const isSent = uid === auth.currentUser.uid;
  const containerClass = isSent
    ? 'flex-row-reverse bg-green-500'
    : 'bg-medium-gray';
  const imgClass = isSent ? 'ml-2' : 'mr-2';
  const textAlignClass = isSent ? 'text-right' : 'text-left';

  return (
    <div
      className={`flex shadow-md items-center ${containerClass} p-2 rounded-lg my-1 mx-3 max-w-xs md:max-w-md lg:max-w-lg ${isSent ? 'ml-auto' : 'mr-auto'}`}
    >
      <img
        src={
          photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
        }
        alt="User Avatar"
        className={`rounded-full w-10 h-10 object-cover ${imgClass}`}
      />
      <p className={`flex-1 text-sm text-white ${textAlignClass}`}>{text}</p>
    </div>
  );
};

export default ChatMessage;
