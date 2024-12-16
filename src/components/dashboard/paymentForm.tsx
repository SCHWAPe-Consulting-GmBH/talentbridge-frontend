'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import visa from '@/assets/images/visa-logo.png';
import mastercard from '@/assets/images/mastercard.png';
import americanExpress from '@/assets/images/american-express.png';

interface FormInfo {
  email: string,
  cardNumber: string,
  expire: string,
  cvv: string,
  name: string
}

export const PaymentForm = () => {
  const router = useRouter();
  const options = [
    { src: visa, alt: 'visa logo', size: 24.3 },
    { src: mastercard, alt: 'mastercard logo', size: 19 },
    { src: americanExpress, alt: 'american express logo', size: 25 },
  ];
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear() % 100;

  const [formInfo, setFormInfo] = useState<FormInfo>({
    email: '',
    cardNumber: '',
    expire: '',
    cvv: '',
    name: ''
  })

  const [formInfoErrors, setFormInfoErrors] = useState<Record<keyof FormInfo, string>>({
    email: '',
    cardNumber: '',
    expire: '',
    cvv: '',
    name: ''
  })

  const formatCardNumber = (number: string) => {
    return number.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpire = (number: string) => {
    return number.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  };

  const onChangeFormInfo = (field: keyof FormInfo, value: string ) => {
    if (field === 'cardNumber') {
      const cleanedValue = value.replace(/\s+/g, '');

      if (isNaN(cleanedValue)) {
        return;
      } else {
        setFormInfo(prev => ({...prev, [field]: cleanedValue}));
        return;
      }
    }

    if (field === 'expire') {
      const cleanedValue = value.replace('/', '');

      if (isNaN(cleanedValue)) {
        return;
      } else {
        setFormInfo(prev => ({...prev, [field]: cleanedValue}));
        return;
      }
    }

    if (field === 'cvv' && isNaN(value)) {
      return;
    }
    const isValid = /^[A-Za-z\s]+$/.test(value);

    if (field === 'name' && !isValid) {
      return;
    }
    setFormInfo(prev => ({...prev, [field]: value}));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace('/dashboard');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label
        className="mb-1 leading-[19px] text-neutral2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        value={formInfo.email}
        onChange={e => onChangeFormInfo('email', e.target.value)}
        className="input_text border border-light-gray w-full mb-3"
      />
      <div className="relative mb-3">
        <label
          className="mb-1 leading-[19px] text-neutral2"
          htmlFor="cardInfo"
        >
          Card information
        </label>
        <input
          id="cardInfo"
          type="text"
          maxLength={19}
          placeholder="XXXX XXXX XXXX XXXX"
          value={formatCardNumber(formInfo.cardNumber)}
          onChange={e => onChangeFormInfo('cardNumber', e.target.value)}
          className="input_text border border-light-gray w-full leading-3"
        />
        <div className="flex gap-1 absolute top-10 right-2">
          {options.map((option) => (
            <div
              key={uuidv4()}
              className="h-[24px] w-[39px] border border-light-gray rounded-sm flex items-center justify-center"
            >
              <Image src={option.src} alt={option.alt} width={option.size} className='h-auto'/>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label
            className="mb-1 leading-[19px] text-neutral2"
            htmlFor="expireDate"
          >
            Expire Date
          </label>
          <input
            id="expireDate"
            type="text"
            placeholder='MM/YY'
            maxLength={5}
            value={formatExpire(formInfo.expire)}
            onChange={e => onChangeFormInfo('expire', e.target.value)}
            className="input_text border border-light-gray w-full mb-3"
          />
        </div>

        <div>
          <label
            className="mb-1 leading-[19px] text-neutral2"
            htmlFor="cvv"
          >
            CVV Code
          </label>
          <input
            id="cvv"
            maxLength={3}
            type="text"
            value={formInfo.cvv}
            onChange={e => onChangeFormInfo('cvv', e.target.value)}
            className="input_text border border-light-gray w-full mb-3"
          />
        </div>
      </div>

      <label
        className="mb-1 leading-[19px] text-neutral2"
        htmlFor="nameCard"
      >
        Name on Card
      </label>
      <input
        id="nameCard"
        type="text"
        value={formInfo.name}
        onChange={e => onChangeFormInfo('name', e.target.value)}
        className="input_text border border-light-gray w-full mb-8"
      />

      <button
        type='submit'
        className='font-bold text-[16px] leading-[22px] text-white py-[11px] rounded-lg bg-primary btn_green_hover w-full'
      >
        Pay $65.00
      </button>
    </form>
  );
};
