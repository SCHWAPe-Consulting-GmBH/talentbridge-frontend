import {
  collection,
  query as fbQuery,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
  where,
  getDocs,
  startAfter,
  QueryDocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../video-call-components/ChatMessage';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { currentUserQuery } from '@/reaqtQuery/userQuery';
import { IMessage } from '@/types/messages';

interface Props {
  activeChatId: string;
}

export const Messages: React.FC<Props> = ({ activeChatId }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { data: currentUserId } = useQuery(currentUserQuery);

  const chatRef = useRef<HTMLDivElement>(null);

  // const loadMoreMessages = async () => {
  //   if (!activeChatId || isLoading) return;
  //   setIsLoading(true);

  //   const messagesRef = collection(firestore, 'messages');
  //   const messagesQuery = fbQuery(
  //     messagesRef,
  //     where('chatId', '==', activeChatId),
  //     orderBy('createdAt', 'desc'),
  //     startAfter(lastDoc || 0),
  //     limit(20)
  //   );

  //   const snapshot = await getDocs(messagesQuery);

  //   if (!snapshot.empty) {
  //     const olderMessages = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
  //     setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  //   }

  //   setIsLoading(false);
  // };

  // const fetchingMessages = () => {
  //   try {
  //     const messagesRef = collection(firestore, 'messages');

  //     const messagesQuery = fbQuery(
  //       messagesRef,
  //       orderBy('createdAt', 'desc'),
  //       where('chatId', '==', activeChatId),
  //       limit(25)
  //     );

  //   } catch {}
  // };

  const fetchingMessages = async () => {
    try {
      const messagesRef = collection(firestore, 'messages');

      const messagesQuery = fbQuery(
        messagesRef,
        orderBy('createdAt', 'desc'),
        where('chatId', '==', activeChatId),
        limit(25)
      );

      const snapshot = await getDocs(messagesQuery);

      if (!snapshot.empty) {
        const currentMessages = snapshot.docs.map((doc) => ({
          ...(doc.data() as IMessage),
          id: doc.id,
        }));
  
        // setMessages((prevMessages: IMessage[]) => [...currentMessages, ...prevMessages]);

        setMessages([...currentMessages].reverse());
        // setMessages(currentMessages);
        console.log('reverse()', [...currentMessages].reverse())
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch {
      setErrorMessage('Something went wrong while loading messages!');
    }
  }



  const addMessageToChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  useEffect(() => {
    if (!activeChatId) return;

    const messagesRef = collection(firestore, 'messages');
    const messagesQuery = fbQuery(
      messagesRef,
      where('chatId', '==', activeChatId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...(doc.data() as IMessage),
        id: doc.id,
      }));

      setMessages((prevMessages: IMessage[]) => {
        const existingIds = new Set(prevMessages.map((msg) => msg.id));
        const uniqueMessages = newMessages.filter((msg) => !existingIds.has(msg.id));
        console.log()
        return [...prevMessages, ...uniqueMessages];
      });
    });

    return () => unsubscribe();
  }, [activeChatId]);

  useEffect(() => {
    setIsLoading(true);
    fetchingMessages()
    .finally(() => setIsLoading(false));

    
  }, [])


  useEffect(() => {
    if (messages && messages.length) {
      chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-end bg-blue-100 w-[100%] h-[600px] py-6 px-[100px] custom-scrollbar">
      <div
        ref={chatRef}
        className="overflow-auto h-full custom-scrollbar mb-5"
        onScroll={() => {
          if (chatRef.current!.scrollTop === 0) {
            // loadMoreMessages();
            console.log('load more');
          }
        }}
      >
        {messages &&
          messages?.map((msg) => <ChatMessage key={uuidv4()} message={msg} />)}
        {messages && !messages.length && <p>No messages yet!</p>}
      </div>

      <form onSubmit={(e) => addMessageToChat(e)} className="flex">
        <input
          type="text"
          placeholder="Enter text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="input_text h-[43px] mr-4 text-secondary w-[100%] bg-white border border-light-gray"
        />

        <button
          type="submit"
          className="font-main text-white max-h-[43px] flex items-center justify-center rounded-lg font-bold py-[14px] px-[20px] bg-primary btn_green_hover"
        >
          Send
        </button>
      </form>
    </div>
  );
};
