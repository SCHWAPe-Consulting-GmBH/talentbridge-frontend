'use client';

import { createChat } from '@/utils/createChat';
import { Select } from 'antd';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { currentUserQuery } from '@/reaqtQuery/userQuery';

const Chats = () => {
  const [chatName, setChatName] = useState('');
  const [allUsersChats, setAllUserChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState('');
  const [activeChatPlusId, setActiveChatPlusId] = useState('');
  const { data: currentUserId } = useQuery(currentUserQuery);
  console.log(currentUserId);

  const getUserChats = async () => {
    const chatsRef = collection(firestore, 'chats');
    console.log('userID:', currentUserId);
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUserId)
    );

    const getAllUsers = async () => {
      const usersRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersRef);
    
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      console.log(users);
      return users;
    };

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Чати не знайдені!');
      return;
    }
    const chats = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID документа
      ...doc.data(), // Дані документа
    }));
    console.log(chats);
    setAllUserChats(chats);
  };

  useEffect(() => {
    if (currentUserId) {
      getUserChats();
    }
  }, [currentUserId]);
  console.log('all chat', allUsersChats);

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
          onClick={() => {
            createChat(chatName, currentUserId!);
            getUserChats();
            setChatName('');
          }}
        >
          Create chat
        </button>
      </div>

      <div>
        <h2 className="font-bold text-[36px]">Chats list:</h2>
        <ul>
          {allUsersChats.map((chat) => (
            <li key={chat.id} className="list-disc ml-8 flex items-center">
              <span className="w-3 h-3 rounded-full bg-black mr-3"></span>
              <button
                className="btn_scale mr-4"
                onClick={() => setActiveChatId(chat.id)}
              >
                {chat.name}
              </button>
              <button className="bg-primary w-5 h-5 rounded-lg flex items-center justify-center btn_green_hover">
                +
              </button>
              {activeChatPlusId && (
                <Select
                  style={{ width: 228, height: 56 }}
                  placeholder="Day"
                  suffixIcon={<IconArrowForSelect />}
                  onChange={(e) => handleChangeDate(e, 'day')}
                  options={visibleDays}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {activeChatId && <div></div>}
    </div>
  );
};

export default Chats;
