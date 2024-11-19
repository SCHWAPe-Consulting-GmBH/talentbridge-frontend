import Image from 'next/image';
import addFile from '@/assets/icons/add_file.svg';
import sendMessage from '@/assets/icons/send_message.svg';
import { useState, useRef, ChangeEvent, MouseEvent } from 'react';

const ChatSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileInfo(
        `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
      );
    }
  };

  const handleFileClick = () => {
    fileInputRef.current!.click();
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('message', message);

    fetch('https://your-server.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Message and file sent successfully!');
        setMessage('');
        setSelectedFile(null);
        setFileInfo('');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error sending message and file!');
      });
  };

  return (
    <div className="flex flex-col justify-end bg-background-second p-3 rounded-2xl">
      <div className="flex items-center space-x-2 relative w-full">
        <button onClick={handleFileClick} className="absolute left-5 transform hover:scale-90 transition-transform duration-300">
          <Image src={addFile} alt="Add File" width={24} />
        </button>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <input
          className="flex-grow py-2 pl-[46px] rounded-xl pr-[50px] max-w-[288px] input_text bg-neutral3"
          placeholder="Type Something..."
          value={message}
          onChange={handleMessageChange}
        />

        <button onClick={handleSubmit} className="absolute rounded-full right-2 btn_green_hover">
          <Image src={sendMessage} alt="Send Message" width={40} />
        </button>
      </div>
      {fileInfo && <p className="text-white text-sm">{fileInfo}</p>}
    </div>
  );
};

export default ChatSection;
