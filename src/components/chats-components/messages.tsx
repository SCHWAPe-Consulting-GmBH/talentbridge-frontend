import {
  collection,
  query as fbQuery,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../video-call-components/ChatMessage';
import { useEffect, useState } from 'react';

interface Props {
  activeChatId: string;
}

export const Messages: React.FC<Props> = ({ activeChatId }) => {
  const [text, setText] = useState('');
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = fbQuery(
    messagesRef,
    orderBy('createdAt', 'asc'),
    limit(25)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  useEffect(() => {
    
  }, [])

  return (
    <div className="flex flex-col justify-end">
      <div>
        {messages &&
          messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {messages && !messages.length && <p>No messages yet!</p>}
      </div>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input_text h-[43px] mr-4 text-secondary w-[400px] bg-white border border-light-gray"
        />
        <button
          className="font-main text-white  max-h-[52px] rounded-lg font-bold py-[14px] px-[20px] bg-primary btn_green_hover"
          onClick={() => {}}
        >
          Send
        </button>
      </div>
    </div>
  );
};
