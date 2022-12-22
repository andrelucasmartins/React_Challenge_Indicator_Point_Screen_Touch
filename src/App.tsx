import { v4 as uuidv4 } from "uuid";

import { MouseEvent, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { DotPin } from "./components/DotPin";

interface DotProps {
  id: string;
  clientX: number;
  clientY: number;
}

function App() {
  const [dotList, setDotList] = useState<DotProps[]>([]);
  const [unDid, setUnDid] = useState<DotProps[]>([]);

  function handleClick(event: MouseEvent) {
    const newDot = {
      id: uuidv4(),
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setDotList((prevState) => [...prevState, newDot]);
  }

  function handleUndo(event: MouseEvent) {
    event.stopPropagation();

    if (dotList.length === 0) return;

    const lastDot = dotList[dotList.length - 1];
    setUnDid((prevState) => [...prevState, lastDot]);

    setDotList((prevState) => {
      const newArray = [...prevState.slice(0, -1)];
      return newArray;
    });
  }

  function handleRedo(event: MouseEvent) {
    event.stopPropagation();

    const lastDot = unDid[unDid.length - 1];

    if (unDid.length === 0) return;

    setDotList((prevState) => [...prevState, lastDot]);

    setUnDid((prevState) => {
      const newArray = [...prevState.slice(0, -1)];
      return newArray;
    });
  }

  return (
    <div className="App">
      <main id="page" onClick={handleClick}>
        <div className="groupButton">
          <Button onClick={handleUndo}>Desfazer</Button>
          <Button onClick={handleRedo}>Refazer</Button>
        </div>
        {dotList.map((dot) => (
          <DotPin key={dot.id} x={dot.clientX} y={dot.clientY} />
        ))}
      </main>
    </div>
  );
}

export default App;
