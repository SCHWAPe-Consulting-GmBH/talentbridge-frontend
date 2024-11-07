import React from "react";

interface Props {
  borderColor?: string;
  paddingY?: number;
  paddingX?: number;
}

export const RegisterForCourseButton: React.FC<Props> = ({ 
  borderColor = '#5DE85B',
  paddingY,
  paddingX 
}) => {
  
    return (
    <button
      style={{ border: `1px solid ${borderColor}`, paddingInline: `${paddingX}px`, paddingBlock: `${paddingY}px` }} 
      className="bg-primary w-fit btn_hover rounded-lg p-[9px] box-border font-semibold text-[16px]"
    >
      Register for courses
    </button>
  );
};
