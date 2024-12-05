'use client';

import { createChat } from '@/utils/createChat';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { currentUserQuery } from '@/reaqtQuery/userQuery';
import { AddUsersToChat } from '@/components/chats-components/addUsersToChat';
import { Messages } from '@/components/chats-components/messages';

const Chats = () => {
  const [chatName, setChatName] = useState('');
  const [allUsersChats, setAllUserChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState('');

  const [activeChatPlusId, setActiveChatPlusId] = useState('');
  const { data: currentUserId } = useQuery(currentUserQuery);

  const getUserChats = async () => {
    const chatsRef = collection(firestore, 'chats');

    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUserId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Чати не знайдені!');
      return;
    }

    const chats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAllUserChats(chats);
  };

  const handleOpenDropDown = (id: string) => {
    if (id === activeChatPlusId) {
      setActiveChatPlusId('');
    } else {
      setActiveChatPlusId(id);
    }
  };

  const handleCreateChat = async () => {
    await createChat(chatName, currentUserId!);
    getUserChats();
    setChatName('');
  };

  useEffect(() => {
    if (currentUserId) {
      getUserChats();
    }
  }, [currentUserId]);

  return (
    <div className="p-5">
      <div className="flex items-center mb-5">
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          className="input_text h-[43px] mr-4 text-secondary w-[400px] bg-white border border-light-gray"
        />
        <button
          className="font-main text-white  max-h-[52px] rounded-lg font-bold py-[14px] px-[20px] bg-primary btn_green_hover"
          onClick={handleCreateChat}
        >
          Create chat
        </button>
      </div>
      <div className="flex gap-5">
        <div>
          <h2 className="font-bold text-[36px]">Chats list:</h2>
          <ul>
            {allUsersChats.length > 0 ? (
              allUsersChats.map((chat) => (
                <li
                  key={chat.id}
                  className="list-disc ml-8 flex items-center h-[42px]"
                >
                  <span className="w-3 h-3 rounded-full bg-black mr-3"></span>
                  <button
                    className="btn_scale mr-4"
                    onClick={() => setActiveChatId(chat.id)}
                  >
                    {chat.name}
                  </button>
                  <button
                    onClick={() => handleOpenDropDown(chat.id)}
                    className={`w-5 h-5 rounded-lg mr-5 flex items-center justify-center btn_green_hover ${activeChatPlusId === chat.id ? 'bg-error' : 'bg-primary'}`}
                  >
                    {activeChatPlusId === chat.id ? '-' : '+'}
                  </button>
                  {activeChatPlusId === chat.id && (
                    <AddUsersToChat chatId={activeChatPlusId} />
                  )}
                </li>
              ))
            ) : (
              <li className="ml-8">No chats found. Create a new one!</li>
            )}
          </ul>
        </div>
        {activeChatId && <Messages activeChatId={activeChatId} />}
      </div>
    </div>
  );
};

export default Chats;
