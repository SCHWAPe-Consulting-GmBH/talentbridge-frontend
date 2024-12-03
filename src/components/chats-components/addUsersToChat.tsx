import {
  arrayUnion,
  collection,
  doc,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { IconArrowForSelect } from '../iconArrowForSelect';
import { useQuery } from '@tanstack/react-query';
import { currentUserQuery } from '@/reaqtQuery/userQuery';
import { MultiSelection } from './multiSelect';
import { IOptions } from '@/types/multiSelectTypes';

interface Props {
  chatId: string;
}

export const AddUsersToChat: React.FC<Props> = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState<IOptions[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<IOptions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: currentUserId } = useQuery(currentUserQuery);
  console.log('visiblePeople', visibleUsers);
  const fetchUsers = async () => {
    const usersRef = collection(firestore, 'users');
    let q;

    if (searchQuery) {
      console.log('hi');
      q = query(
        usersRef,
        orderBy('email'),
        startAt(searchQuery),
        endAt(searchQuery + '\uf8ff'),
        where('id', '!=', currentUserId),
        limit(20)
      );
    } else {
      q = query(
        usersRef,
        orderBy('email'),
        where('id', '!=', currentUserId),
        limit(20)
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const addParticipantsToChat = async () => {
    try {
      const chatRef = doc(firestore, 'chats', chatId);

      await updateDoc(chatRef, {
        participants: arrayUnion(...selectedPeople),
      });

      console.log('Participants added successfully');
    } catch (error) {
      console.error('Error adding participants to chat:', error);
    }
  };

  useEffect(() => {
    console.log('hello');
    // setLoading(true);

    fetchUsers()
      .then((resp) => {
        console.log('resp:', resp);
        setVisibleUsers(
          resp.map((res) => ({ value: res.id, label: res.email }))
        );
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <>
      {loading ? (
        <div className="w-[228px] h-[42px] bg-light-gray rounded-md animate-pulse"></div>
      ) : (
        <>
          {console.log('visiblePeople2', visibleUsers)}
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Add to chat"
            suffixIcon={<IconArrowForSelect />}
            onChange={(e) => setSelectedPeople(e)}
            onSearch={(value) => {
              setSearchQuery(value);
            }}
            options={visibleUsers}
          />
          <MultiSelection 
            options={visibleUsers} 
            placeholder="Add to chat"
            onChangeSelected={setSelectedPeople}
            selected={selectedPeople}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
          <button
            onClick={addParticipantsToChat}
            className="bg-primary ml-2 h-[56px] font-semibold mb-[20px] rounded-lg btn_green_hover"
          >
            Add Users
          </button>
          {visibleUsers.map((user) => (
            <div>
              <p>{user.label}</p>
              <p>{user.value}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
