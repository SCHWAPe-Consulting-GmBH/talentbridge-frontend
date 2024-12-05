import { currentUserQuery } from '@/reaсtQuery/userQuery';
import { useQuery } from '@tanstack/react-query';

const ChatMessage = ({ message }) => {
  const { data: currentUserId } = useQuery(currentUserQuery);
  // console.log(message);

  const { text, uid, photoURL, displayName } = message;
  const isSent = uid === currentUserId;
  const containerClass = isSent
    ? 'flex-row-reverse bg-green-500'
    : 'bg-medium-gray';
  // const imgClass = isSent ? 'ml-2' : 'mr-2';
  const textAlignClass = isSent ? 'text-right' : 'text-left';

  return (
    <div
      className={`flex  gap-1 shadow-md items-center ${containerClass} p-2 rounded-lg my-1 mx-3 max-w-xs md:max-w-md lg:max-w-lg ${isSent ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
    >
      <div className={`rounded-full w-10 h-10 object-cover`}>
        {!photoURL ? (
          <img
            src={photoURL}
            alt="avatar"
            className="w-full h-full rounded-full"
          />
        ) : (
          <div
            className={
              'bg-[rgb(212,0,255)] rounded-full min-w-[40px] min-h-[40px] text-2xl flex justify-center items-center'
            }
          >
            {displayName[0]}
          </div>
        )}
      </div>
      <div>
        <p
          className={`flex-1 text-sm text-white ${textAlignClass} max-w-[170px] break-words`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
