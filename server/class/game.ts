import { Card, CardColor } from "@/types/card";
import { Range, Tuple } from "@/types/utils";
import { shuffle } from "@/utils/array";
import Target from "@/utils/gameObjects/target";
import { range } from "@/utils/range";
import { randomUUID } from "crypto";
import { Server, Socket } from "socket.io";
import Player from "./player";

class Game {
  private static io: Server | null = null;

  private players: Player[];
  private currentPlayerIndex = 0;
  private cards: Card[];

  private readonly id: string;

  constructor(playerSockets: [Socket, Socket]) {
    const gameId = randomUUID();
    this.id = gameId;
    this.players = playerSockets.map(
      (playerSocket) =>
        new Player(playerSocket, gameId, () => this.changeTurn())
    );

    const colors = Object.values(CardColor);
    const numbers = range(1, 10);

    const unShuffledCards = colors
      .map((color) =>
        numbers.map((number) => {
          return {
            color,
            number,
          };
        })
      )
      .flat();

    this.cards = shuffle(unShuffledCards);

    for (const player of this.players) {
      const INITIAL_CARD_COUNT_PER_USER = 6;

      this.cards
        .splice(-INITIAL_CARD_COUNT_PER_USER, INITIAL_CARD_COUNT_PER_USER)
        .forEach((card) => {
          player.onCardDraw(card);
        });
    }

    this.getCurrentPlayer().startTurn();
  }

  private getNextPlayerIndex = () => {
    return (this.currentPlayerIndex + 1) % Game.NUMBER_OF_PLAYERS;
  };

  private getCurrentPlayer = () => {
    return this.players[this.currentPlayerIndex];
  };

  private changeTurn = () => {
    const currentPlayer = this.getCurrentPlayer();

    const drawnCard = this.cards.pop();
    if (drawnCard) {
      currentPlayer.onCardDraw(drawnCard);
    }

    this.currentPlayerIndex = this.getNextPlayerIndex();
    const changedCurrentPlayer = this.getCurrentPlayer();
    changedCurrentPlayer.startTurn();
  };

  getId = () => {
    return this.id;
  };

  private emit = (...params: Parameters<Server["emit"]>) => {
    if (!Game.io) return;
    Game.io.to(this.id).emit(...params);
  };

  static setIo = (io: Server) => {
    Game.io = io;
  };

  private static NUMBER_OF_PLAYERS = 2;
}

export default Game;
