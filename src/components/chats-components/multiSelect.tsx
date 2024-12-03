import { IOptions } from "@/types/multiSelectTypes";
import { useState } from "react";


interface Props {
  options: IOptions[];
  placeholder: string;
  selected: IOptions[];
  searchQuery: string;
  onSearch: (value: string) => void;
  onChangeSelected: (value: IOptions[]) => void;
}

export const MultiSelection: React.FC<Props> = ({ options, placeholder, selected, searchQuery, onChangeSelected, onSearch }) => {

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        className="input_text"
        onChange={e => onSearch(e.target.value)}
        // onClick={}
      />


    </div>
  )
}