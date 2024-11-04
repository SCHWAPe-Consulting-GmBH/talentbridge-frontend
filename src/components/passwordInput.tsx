import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';

interface Props {
  password: string;
  onChangePassword: (value: string) => void;
}

export const PasswordInput: React.FC<Props> = ({ password, onChangePassword }) => {
  const [isVisible, setIsVisible] = useState(false)


  return (
    <div className='relative w-full'>
      <input
        className="input_text w-full mb-[13px] "
        placeholder="Password"
        type={isVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
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
