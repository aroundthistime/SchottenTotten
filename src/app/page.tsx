import Image from "next/image";
import styled from "@emotion/styled";
import { fullScreenCss } from "@/styles";

const Board = styled.div`
  ${fullScreenCss};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

export default function Home() {
  return <Board></Board>;
}
