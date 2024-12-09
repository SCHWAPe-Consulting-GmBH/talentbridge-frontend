import Image from 'next/image';
import design from '@/assets/images/matching_graphic.png';
import { RoundLinkButton } from '@/components/roundLinkButton';
import apple from '@/assets/icons/apple.svg';
import { PaymentForm } from '@/components/dashboard/paymentForm';

const PaymentOptions = () => {
  return (
    <div className="mt-[56px] flex flex-col items-center">
      <h2 className="text-themetext font-extrabold text-[48px] mb-[56px]">
        Payment
      </h2>
      <div className="bg-background-second p-[60px] rounded-2xl flex items-center gap-[54px]">
        <div>
          <p className="text-neutral2 mb-4">
            Total cost:
            <span className="font-bold text-[36px] text-themetext">$789</span>
          </p>

          <div
            className="bg-background-second border border-primary rounded-2xl relative p-5 flex flex-col justify-between
            max-w-[336px] overflow-hidden course_shadow_static z-20"
          >
            {
              <div className="absolute top-[-98px] right-[-13px] z-[-1]">
                <Image
                  src={design}
                  alt="background image"
                  className="ml-[80px]"
                />
              </div>
            }

            <RoundLinkButton />

            <div>
              <p className="px-4 py-2 rounded-full inline bg-opacity-primary text-success border border-primary">
                Beginer
              </p>

              <h2 className="font-extrabold text-[24px] leading-[44px] mt-4 text-themetext">
                Orientieren-Aufstellen-Loslegen
              </h2>
                <p className="text-primary font-medium text-[24px]">KIP GmbH</p>
              <p className="text-neutral2 font-medium text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
          </div>
        </div>

        <div className='max-w-[458px]'>
          <button
            className='bg-secondary text-white rounded-xl w-full py-[11px] btn_scale flex justify-center gap-[11px] mb-8'
          >
            <Image
              src={apple}
              alt=""
              width={15}
            />
            Pay
          </button>

            <div className='flex items-center gap-3 mb-8'>
              <div className='h-[1px] bg-neutral2 w-[157px]'/>
              <p className='font-medium text-[16px] text-neutral2'>Or pay with card</p>
              <div className='h-[1px] bg-neutral2 w-[157px]'/>
            </div>

            <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
