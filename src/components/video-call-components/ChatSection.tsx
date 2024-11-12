import Image from 'next/image';
import addFile from '@/assets/icons/add_file.svg';
import sendMessage from '@/assets/icons/send_message.svg';

const ChatSection = () => {
  return (
    <div className="flex flex-col justify-end bg-background-second p-3 rounded-2xl">
      <div className="flex items-center space-x-2 relative w-full">
        <Image src={addFile} alt="add" width={24} className='absolute left-5'/>
        <input
          className="flex-grow py-2 pl-[46px] rounded-xl pr-[50px] max-w-[288px] input_text bg-neutral3"
          placeholder="Type Something..."
        />
        <Image src={sendMessage} alt="send" width={40} className='absolute right-2'/>
      </div>
    </div>
  );
};

export default ChatSection;
