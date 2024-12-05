'use client'

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  borderColor?: string;
  paddingY?: number;
  paddingX?: number;
  textSize?: number;
}

export const RegisterForCourseButton: React.FC<Props> = ({ 
  borderColor = '#5DE85B',
  paddingY,
  paddingX,
  textSize
}) => {
    const router = useRouter();

    return (
    <button
      style={{ border: `1px solid ${borderColor}`, paddingInline: `${paddingX}px`, paddingBlock: `${paddingY}px`, fontSize: `${textSize}px` }} 
      className="bg-primary w-fit btn_green_hover rounded-xl p-[9px] box-border font-semibold text-[16px]"
      onClick={() => router.push('/dashboard/payment-options') }
    >
      Register for courses
    </button>
  );
};
