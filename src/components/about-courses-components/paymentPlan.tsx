import Image from "next/image"
import monthly from '@/assets/images/pay_monthly.jpg';
import entire from '@/assets/images/pay_entire.jpg';
import { RegisterForCourseButton } from "../registerForCourseButton";

export const PaymentPlan = () => {
  return (
    <section className="flex">
      <div className="w-full bg-primary py-[50px] pr-[178px] flex justify-end">
        <div className="flex flex-col items-center">
          <p className="text-white font-black text-[24px]">pay monthly</p>
          <p className="text-secondary font-black text-[24px] mb-[50px]">without discount</p>
          <Image
            src={monthly}
            alt="picture"
            width={300}
            className="mb-6"
          />
          <p className="font-extrabold text-[64px] text-neutral1 leading-[87px] mb-6">$550/mo</p>
          <RegisterForCourseButton borderColor="black" paddingX={100} />
          <p className="mt-[50px] font-black text-white text-[24px] text-center">
          upon rescheduling <br/>the cost of the course is 1650$
          </p>
        </div>
      </div>

      <div className="w-full bg-secondary py-[50px] pl-[178px] flex justify-start">
      <div className="flex flex-col items-center">
          <p className="text-white font-black text-[24px]">pay the entire course</p>
          <p className="text-primary font-black text-[24px] mb-[50px]">with a discount</p>
          <Image
            src={entire}
            alt="picture"
            width={300}
            className="mb-6"
          />
          <p className="font-extrabold text-[64px] text-white leading-[87px] mb-6">$550/mo</p>
          <RegisterForCourseButton borderColor="black" paddingX={100} />
          <p className="mt-[50px] font-black text-white text-[24px] text-center">
          upon rescheduling <br/>the cost of the course is 1650$
          </p>
        </div>
      </div>
    </section>
  )
}