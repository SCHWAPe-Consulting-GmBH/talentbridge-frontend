import Image from 'next/image';
import addFile from '@/assets/icons/add_file.svg';
import sendMessage from '@/assets/icons/send_message.svg';

const ChatSection = () => {
  return (
    <div className="flex flex-col justify-end bg-slate-700 p-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <Image src={addFile} alt="add" className="w-8 h-8" />
        <input
          className="flex-grow p-1 rounded"
          placeholder="Type Something..."
        />
        <Image src={sendMessage} alt="send" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ChatSection;
