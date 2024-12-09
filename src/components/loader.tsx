import React from 'react';

interface Props {
  width: number;
  height: number;
  border: number;
}

export const Loader: React.FC<Props> = ({ width, height, border }) => {
  return (
    // <div className="max-w-[620px] justify-center items-center my-auto">
    <div className="flex justify-center items-center min-h-screen">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderWidth: `${border}px`,
        }}
        className="mx-auto border-solid border-light-success border-l-primary rounded-full animate-spin"
      />
    </div>
  );
};
