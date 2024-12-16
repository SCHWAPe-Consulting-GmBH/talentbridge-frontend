'use client';

import Image from 'next/image';
import menu from '@/assets/icons/menuKebab.svg';
import search from '@/assets/icons/search_black.svg';
import { createChat } from '@/utils/createChat';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useEffect, useState } from 'react';
import { AddUsersToChat } from '@/components/chats-components/addUsersToChat';
import { Messages } from '@/components/chats-components/messages';
import { useAuth } from '@/firebase/context/authContext';
import message from '@/assets/icons/message_black.svg';
import { IChat } from '@/types/chat';

export const ChatsComponent = () => {
  const [chatName, setChatName] = useState('');
  const [allUsersChats, setAllUserChats] = useState<IChat[]>([]);
  const [activeChatId, setActiveChatId] = useState('');

  const [activeChatPlusId, setActiveChatPlusId] = useState('');

  const [searchQuery, setSearchQuery] = useState(''); // це треба додати в input->value
  const [filteredChats, setFilteredChats] = useState([]); // це треба виводити замість allUsersChats

  const { currentUser } = useAuth();
  // const currentUserId = currentUser?.uid;
  const roleObj = currentUser?.reloadUserInfo.customAttributes;
  let role: Record<'role', string> | null = null;

  if (roleObj) {
    role = JSON.parse(roleObj);
  }

  const getUserChats = async () => {
    const chatsRef = collection(firestore, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    const chats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as Omit<IChat, 'id'>,
    }));
    console.log('chats', chats);
    setAllUserChats(chats);
  };

  useEffect(() => {
    if (currentUser) {
      getUserChats();
    }
  }, [currentUser]);

  const handleOpenDropDown = (id: string) => {
    if (id === activeChatPlusId) {
      setActiveChatPlusId('');
    } else {
      setActiveChatPlusId(id);
    }
  };

  const handleCreateChat = async () => {
    const owner = {id: currentUser.uid, label: currentUser.email, value: 0};
    await createChat(chatName, owner);
    getUserChats();
    setChatName('');
  };

  const handleSearchChats = (query) => { // це треба додати в input на подію onChange
    setSearchQuery(query);

    if (!query) {
      setFilteredChats(allUsersChats);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filtered = allUsersChats.filter((chat) =>
      chat.name.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredChats(filtered);
  };
  useEffect(() => {
    setFilteredChats(allUsersChats);
  }, [allUsersChats]);

  return (
    <section className="flex gap-6 h-full">
      <div className={`bg-background-second w-full p-[15px] rounded-xl h-full ${ role?.role === 'coach' || role?.role === 'moderator' ? 'max-w-[370px]' : 'max-w-[256px]' }`}>

        <div className="flex justify-between items-center gap-6 mb-[15px]">
          <p className="font-bold text-[24px] text-themetext">Chats</p>
          <div className='flex gap-4'>
            <button className='px-2 btn_scale'>
              <Image src={menu} alt="kebab menu" width={6}/>
            </button>
            <button className='w-[22px] btn_scale'>
              <Image src={search} alt="search" width={22} />
            </button>
          </div>
        </div>

        {role?.role === 'coach' || role?.role === 'moderator' && (
          <div className="flex items-center mb-5">
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="input_text h-[43px] mr-4 text-secondary w-[400px] bg-white border border-light-gray"
            />
            <button
              className="font-main text-white max-h-[52px] text-[14px] leading-4 rounded-lg font-bold py-[8px] px-[20px] bg-primary btn_green_hover"
              onClick={handleCreateChat}
            >
              Create chat
            </button>
          </div>
        )}

        <ul>
          {allUsersChats.length > 0 ? (
            allUsersChats.map((chat) => (
              <li
                key={chat.id}
                className="flex items-center h-[42px] truncate"
              >
                <button
                  className="btn_scale mr-4 truncate"
                  onClick={() => setActiveChatId(chat.id)}
                >
                  {chat.name}
                </button>
                {role?.role === 'coach' && <button
                  onClick={() => handleOpenDropDown(chat.id)}
                  className={`px-1 h-5 rounded-lg mr-5 flex items-center justify-center btn_green_hover ${activeChatPlusId === chat.id ? 'bg-error' : 'bg-primary'}`}
                >
                  {activeChatPlusId === chat.id ? '-' : '+'}
                </button>}
                {chat.id === activeChatId && (<div className='bg-primary w-5 h-5 rounded-full p-2'/>)}
                {activeChatPlusId === chat.id && role?.role === 'coach' || role?.role === 'moderator' && (
                  <AddUsersToChat chatId={activeChatPlusId} />
                )}
              </li>
            ))
          ) : (
            <li className="ml-8 ">No chats found. Create a new one!</li>
          )}
        </ul>
      </div>
      
      {activeChatId ? <Messages activeChatId={activeChatId} /> : (
        <div className='flex flex-col justify-center items-center w-full gap-[26px]'>
          <Image
            src={message}
            alt="message icon"
            width={56}
          />
          <p className='font-bold text-[32px]'>Chat not selected</p>
          <p className='font-medium text-[24px] text-neutral2 text-center'>Select the chat to see the message</p>
        </div>
      )}
    </section>
  );
};
