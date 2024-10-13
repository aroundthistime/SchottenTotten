import { Range } from "./utils";

export enum CardColor {
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
}

export interface Card {
  color: CardColor;
  number: Range<1, 10>;
}
