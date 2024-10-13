"use client";

import styled from "@emotion/styled";
import { fullScreenCss } from "@/styles";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/socket";
import { GameAction } from "@/types/action";
import { Card } from "@/types/card";

const Board = styled.div`
  ${fullScreenCss};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

export default function Home() {
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  const endTurn = useCallback(() => {
    socket.emit(GameAction.EndTurn);
    setIsMyTurn(false);
  }, [socket]);

  useEffect(() => {
    socket.on(GameAction.StartTurn, () => {
      setIsMyTurn(true);
    });
    socket.on(GameAction.MyCardDraw, (card: Card) => {
      setCards((prev) => prev.concat([card]));
    });
    return () => {
      socket.off(GameAction.StartTurn);
      socket.off(GameAction.MyCardDraw);
    };
  }, [socket]);

  return (
    <Board>
      {isMyTurn && <button onClick={endTurn}>End Turn</button>}
      <ul>
        {cards.map((card) => (
          <li key={`${card.color}-${card.number}`}>
            <p>{`color: ${card.color}`}</p>
            <p>{`number: ${card.number}`}</p>
          </li>
        ))}
      </ul>
    </Board>
  );
}
