import React from 'react';

interface Props {
  width: number;
  height: number;
}

export const Loader: React.FC<Props> = ({ width, height }) => {
  const widthForEdge = (0.275 * (width - 68)) - 0.92;
  
  return (
  <div className="max-w-[620px] justify-center items-center my-auto">
    <div className="highlightRoundBox" style={{ width: `${width}px`, height: `${height}px` }}>
      <span className="loading">
        <span className="edge edge-left" style={{ left: `${widthForEdge}rem` }}></span>
        <span className="edge edge-right" style={{ right: `${widthForEdge}rem` }}></span>
      </span>
    </div>
  </div>
)};
