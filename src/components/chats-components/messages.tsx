import {
  collection,
  query as fbQuery,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
  where,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../video-call-components/ChatMessage';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { currentUserQuery } from '@/reaqtQuery/userQuery';

interface Props {
  activeChatId: string;
}

export const Messages: React.FC<Props> = ({ activeChatId }) => {
  const [messageText, setMessageText] = useState('');
  const { data: currentUserId } = useQuery(currentUserQuery);
  const messagesRef = collection(firestore, 'messages');

  console.log('active chat id', activeChatId);
  console.log('currentUserId', currentUserId);
  const messagesQuery = fbQuery(
    messagesRef,
    orderBy('createdAt', 'asc'),
    where('chatId', '==', activeChatId),
    limit(25)
  );
  console.log('messagesQuery', messagesQuery);
  const snapshot = getDocs(messagesQuery);
  const m = snapshot.then((resp) =>
    resp.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );

  const [messages] = useCollectionData(messagesQuery);
  console.log('messages', messages);

  const addMessageToChat = async () => {
    try {
      if (messageText.trim()) {
        const newMessage = {
          chatId: activeChatId,
          text: messageText,
          senderId: currentUserId,
          createdAt: serverTimestamp(),
        };

        const messagesRef = collection(firestore, 'messages');
        await addDoc(messagesRef, newMessage);
        setMessageText('');
      }
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-end bg-blue-100 w-[100%] h-[600px] p-6 custom-scrollbar">
      <div>
        {messages &&
          messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {messages && !messages.length && <p>No messages yet!</p>}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Enter text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="input_text h-[43px] mr-4 text-secondary w-[100%] bg-white border border-light-gray"
        />
        <button
          className="font-main text-white max-h-[43px] flex items-center justify-center rounded-lg font-bold py-[14px] px-[20px] bg-primary btn_green_hover"
          onClick={() => addMessageToChat()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
