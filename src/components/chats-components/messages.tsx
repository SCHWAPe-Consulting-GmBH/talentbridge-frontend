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
import { currentUserQuery } from '@/reaсtQuery/userQuery';
import { IMessage } from '@/types/messages';
import text_under from '@/assets/icons/text_format_underline.svg';
import text_add_photo from '@/assets/icons/text_photo-plus.svg';
import text_tt from '@/assets/icons/text_tt.svg';
import text_aa from '@/assets/icons/text-aa.svg';
import copy from '@/assets/icons/copy.svg';
import text_bold from '@/assets/icons/bold_b.svg';
import text_list from '@/assets/icons/text-list.svg';
import Image from 'next/image';
import send from '@/assets/icons/btn_send.svg';

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

        setMessages([...currentMessages].reverse());
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch {
      setErrorMessage('Something went wrong while loading messages!');
    }
  };

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
        const uniqueMessages = newMessages.filter(
          (msg) => !existingIds.has(msg.id)
        );
        return [...prevMessages, ...uniqueMessages];
      });
    });

    return () => unsubscribe();
  }, [activeChatId]);

  useEffect(() => {
    setIsLoading(true);
    fetchingMessages().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (messages && messages.length) {
      chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-end w-full h-full custom-scrollbar">
      <div
        ref={chatRef}
        className="overflow-auto h-full custom-scrollbar mb-5 flex flex-col"
        onScroll={() => {
          if (chatRef.current!.scrollTop === 0) {
            // loadMoreMessages();
          }
        }}
      >
        {messages &&
          messages?.map((msg) => <ChatMessage key={uuidv4()} message={msg} />)}
        {messages && !messages.length && (
          <p className="font-bold text-[32px] text-center m-auto">
            No messages yet!
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => addMessageToChat(e)}
        className="flex flex-col bg-white w-[100%] py-3 px-4 rounded-xl"
      >
        <div className="flex gap-2 mb-4">
          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_aa} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_bold} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_tt} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_under} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_list} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={copy} alt="" width={16} />
          </button>

          <button className='w-8 h-8 flex items-center justify-center '>
            <Image src={text_add_photo} alt="" width={16} />
          </button>
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Enter text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="input_text h-[43px] mr-4 text-secondary w-full"
          />

          <button
            type="submit"
            className="h-[39px] w-[39px] flex items-center justify-center btn_scale"
          >
            <Image
              src={send}
              alt="button send"
              width={24}
            />
          </button>
        </div>
      </form>
    </div>
  );
};
