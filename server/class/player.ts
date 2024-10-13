import { GameAction } from "@/types/action";
import { Card } from "@/types/card";
import { Socket } from "socket.io";

class Player {
  private readonly socket: Socket;
  private readonly gameId: string;

  constructor(socket: Socket, gameId: string, onTurnEnd: () => void) {
    this.socket = socket;
    this.gameId = gameId;

    this.socket.join(gameId);
    this.socket.on(GameAction.EndTurn, onTurnEnd);
  }

  startTurn = () => {
    this.socket.emit(GameAction.StartTurn);
  };

  onCardDraw = (card: Card) => {
    this.socket.emit(GameAction.MyCardDraw, card);
    this.emitToOpponent(GameAction.OpponentCardDraw);
  };

  private emitToOpponent = (...params: Parameters<Socket["emit"]>) => {
    this.socket.to(this.gameId).emit(...params);
  };
}

export default Player;
