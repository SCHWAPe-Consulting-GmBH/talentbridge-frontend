import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';

export const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false)


  return (
    <div className='relative w-full'>
      <input
        className="input_text w-full mb-[13px] "
        placeholder="Password"
        type={isVisible ? 'text' : 'password'}
      />
      <button
        type="button"
        className="absolute top-4 right-4"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
      </button>
    </div>
  );
};
