import React, { useState } from 'react';

const btnValues = [
  ["C", "%", "/", "del"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  ["+-", 0, ".", "="],
];

export default function Calculator() {
  const [calDisplay, setCalDisplay] = useState([]);

  const clickOperator = (ops) => {
    if(ops !== "C" && ops !== "del" && ops !== "=") {
      setCalDisplay([...calDisplay, ops])
    }

    if(ops === "C") {
      setCalDisplay([]);
    }

    if(ops === "del") {
      let newVal = [...calDisplay];
      newVal.pop();
      setCalDisplay(newVal);
    }

    if(ops === "=") {
      try {
        const expression = calDisplay.join('').replace(/x/g, '*');
        const result = eval(expression);
        setCalDisplay([result]);
      } catch (error) {
        console.error(error);
        setCalDisplay(["Error"]);
      }
    }
  }

  return (
    <>
      <div className='p-4 bg-[#363636] text-3xl rounded-t-xl h-24 flex justify-end font-semibold'>
        {calDisplay.map((item, idx) => (
          <p className={`${typeof item === "number" ? "mx-0" : "mx-1"}`} key={idx}>{item}</p>
        ))}
      </div>
      <div className='h-96 flex flex-wrap gap-2 overflow-auto px-2 py-2'>
        {btnValues.flat().map((btn, i) => {
          return (
            <button className={`w-18 p-1 xl:w-20 ${btn === "C" ? "bg-red-600 font-semibold" : btn === "=" ? "bg-yellow-600 font-semibold" : ""} text-lg border border-white rounded-lg active:bg-white active:text-black`} onClick={() => clickOperator(btn)} key={i}>
              {btn}
            </button>
          );
        })}
      </div>
    </>
  )
}
