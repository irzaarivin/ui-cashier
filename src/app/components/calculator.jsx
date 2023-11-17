import React, { useEffect, useState } from 'react'
import './calculator.css'

const Calculator = () => {
  const [res, setRes] = useState('')

  const calculate = () => {
    setRes(String(eval(res)))
    if(res == 0) setRes('')
  };

  const liveScreen = (val) => {
    return setRes(res + val)
  };

  const handleClear = () => {
    setRes('');
  };

  return (
    <div className="calculator">
      <div className="first-row">
        <input type="text" name="result" value={res} placeholder="0" readonly />
        <input type="button" value="C" onClick={() => handleClear()} id="clear-button" />
      </div>
      <div className="second-row">
        <input type="button" value="1" onClick={() => liveScreen(1)} />
        <input type="button" value="2" onClick={() => liveScreen(2)} />
        <input type="button" value="3" onClick={() => liveScreen(3)} />
        <input className="symb" type="button" value="+" onClick={() => liveScreen(' + ')} />
      </div>
      <div className="third-row">
        <input type="button" value="4" onClick={() => liveScreen(4)} />
        <input type="button" value="5" onClick={() => liveScreen(5)} />
        <input type="button" value="6" onClick={() => liveScreen(6)} />
        <input className="symb" type="button" value="-" onClick={() => liveScreen(' - ')} />
      </div>
      <div className="fourth-row">
        <input type="button" value="7" onClick={() => liveScreen(7)} />
        <input type="button" value="8" onClick={() => liveScreen(8)} />
        <input type="button" value="9" onClick={() => liveScreen(9)} />
        <input className="symb" type="button" value="x" onClick={() => liveScreen(' * ')} />
      </div>
      <div className="fifth-row">
        <input className="symb" type="button" value="/" onClick={() => liveScreen(' / ')} />
        <input type="button" value="0" onClick={() => liveScreen(0)} />
        <input className="symb" type="button" value="." onClick={() => liveScreen('.')} />
        <input className="symb" type="button" value="=" onClick={() => calculate()} />
      </div>
    </div>
  )
}

export default Calculator
