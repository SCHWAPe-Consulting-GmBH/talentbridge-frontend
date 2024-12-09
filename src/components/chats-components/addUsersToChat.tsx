import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { useEffect, useState } from 'react';
import { MultiSelection } from './multiSelect';
import { IOptions } from '@/types/multiSelectTypes';
import { searchUsers } from '@/api/operations';
import { useAuth } from '@/firebase/context/authContext';

interface Props {
  chatId: string;
}

export const AddUsersToChat: React.FC<Props> = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState<IOptions[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<IOptions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  const fetchUsers = async () => {
    const usersRef = collection(firestore, 'users');
    let q;

    if (searchQuery) {
      const users = await searchUsers(searchQuery);
      return users;
    } else {
      q = query(
        usersRef,
        orderBy('email'),
        where('id', '!=', currentUserId),
        limit(20)
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  };

  const addParticipantsToChat = async () => {
    try {
      const chatRef = doc(firestore, 'chats', chatId);

      const chatDoc = await getDoc(chatRef);

      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        const currentParticipants = chatData.participants || [];

        const newParticipants = selectedPeople.filter(
          (person) => !currentParticipants.includes(person)
        );

        if (newParticipants.length > 0) {
          await updateDoc(chatRef, {
            participants: arrayUnion(...newParticipants),
          });
          console.log('Participants added successfully');
        } else {
          console.log('All selected participants are already in the chat');
        }
      } else {
        console.log('Chat does not exist');
      }
    } catch (error) {
      console.error('Error adding participants to chat:', error);
    }
  };

  const handleChangeSelectedPeople = (selectedUser: IOptions) => {
    setSelectedPeople((prevSelected: IOptions[]) => {
      if (prevSelected.find((user) => user.value === selectedUser.value)) {
        return prevSelected.filter((user) => user.value != selectedUser.value);
      }

      return [...prevSelected, selectedUser];
    });
  };

  useEffect(() => {
    fetchUsers()
      .then((resp) => {
        setVisibleUsers(
          resp?.map((res) => ({ value: res.id, label: res.email }))
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
          <div className="flex items-center">
            <MultiSelection
              options={visibleUsers}
              placeholder="Add to chat"
              onChangeSelected={handleChangeSelectedPeople}
              selected={selectedPeople}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
            />
            <button
              onClick={addParticipantsToChat}
              className="bg-primary ml-2 h-[42px] px-2 font-semibold rounded-lg btn_green_hover text-white"
            >
              Add
            </button>
            <ul>
              {selectedPeople.map((people) => (
                <li key={people.value} className={'flex items-center gap-1.25'}>
                  <p>{people.label}</p>
                  <button
                    onClick={() => handleChangeSelectedPeople(people)}
                    className='cursor-pointer'
                    // className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
