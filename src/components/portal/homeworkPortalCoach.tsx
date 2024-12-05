import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';
import plus from '@/assets/icons/plus.svg';

export const HomeworkPortalCoach = () => {
  return (
    <section>
      <div className="flex justify-between mb-[10px]">
        <h2 className="mb-[10px] text-themetext font-bold text-[20px]">Homework</h2>

        <div className="flex space-x-1">
          <button>
            <Image
              src={plus}
              alt='add homework'
              width={11}
            />
          </button>
          <p className="font-semibold text-primary">Add Homework</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[1,2,3,4].map(homework => {
          return (
            <div
              key={uuidv4()}
              className="bg-background-second rounded-2xl p-[15px] truncate green_border_hover border-box border border-transparent cursor-pointer course_shadow"
            >
              <p className="text-themetext font-bold text-[16px] truncate">Homework 1</p>
              <p className="truncate text-[12px] text-themetext">Lorem ipsum dolor sit amet consectetur. Augue morbi massa rutrum in sem facilisis faucibus tempor. </p>
            </div>
          )
        })}
      </div>

    </section>
  )
}