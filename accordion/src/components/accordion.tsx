import React from "react";
import { data } from "../data/data";
import { useState } from "react";

export const Accordion: React.FC = () => {
  const [selected, setSelected] = useState(3);
  const [selectedMany, setSelectedMany] = useState<Array<number>>([]);
  const [mode, setMode] = useState("single");


  const select = (num: number) => {
    // check if is in mode single
    if (mode === "single") {
      //check if section is already open, if it is close otherwise open it
      selected !== num ? setSelected(num) : setSelected(3);
    } else {
        // if mode many (open more then section together)
        if (selectedMany.includes(num)) {
        //if it is already open close it
        setSelectedMany(selectedMany.filter((selected) => selected !== num));
        } else {
        // otherwise open
        setSelectedMany((selectedMany) => [...selectedMany, num]);
      }
    }
  };

  return (
    <div className=" justify-center pt-[70px] px-10 xs:p-14 md:px-36 lg:px[250px] xl:px-[400px] 2xl:px-[500px] ">
      <p className=" text-xl">How many section do you want to open?</p>
      <div className=" flex justify-center gap-6 pt-4">
        <button
          className={`p-2 bg-black text-white rounded-md ${
            mode === "single" && "bg-slate-400"
          }`}
          onClick={() => setMode("single")}
        >
          One
        </button>
        <button
          className={`p-2 bg-black text-white rounded-md ${
            mode === "many" && "bg-slate-400"
          }`}
          onClick={() => setMode("many")}
        >
          Many
        </button>
      </div>
      {data.map((value, idx) => (
        <div key={idx} className=" bg-black text-white p-3 m-4 rounded-md">
          <h1 className="font-bold pb-2" onClick={() => select(idx)}>
            {value.title}
          </h1>
          {mode === "single"
            ? selected === idx && <p>{value.text}</p>
            : selectedMany.includes(idx) && <p>{value.text}</p>}
        </div>
      ))}
    </div>
  );
};
