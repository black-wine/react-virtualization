import styled from "@emotion/styled";
import React, { FC, useRef, useEffect, useState } from "react";
import { Item } from "./Item";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { COUNT_PER_LOAD, ROW_HEIGHT } from "../constants";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
  searchWord:string;
}
export const List: FC<ListProps> = ({ items, searchWord }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(listRef, COUNT_PER_LOAD);
  const [displayListNum, setDisplayListNum] = useState<number>(1);
  const prevSearchWordRef = useRef(searchWord)
  const totalNum = items.length;
  const prevHiddenCount = displayListNum > 1 ? (displayListNum - 2) * COUNT_PER_LOAD :0
  const nextHiddenCount = (totalNum - displayListNum * COUNT_PER_LOAD) >= COUNT_PER_LOAD  ? totalNum - displayListNum * COUNT_PER_LOAD : 0;
  const currentCount = (displayListNum + 1) * COUNT_PER_LOAD >= totalNum ? totalNum : (displayListNum + 1) * COUNT_PER_LOAD;
  const currentItems = items.slice(prevHiddenCount, currentCount)
  const handleScroll = () => {
    const isNext = listRef.current.scrollTop >= displayListNum * COUNT_PER_LOAD * ROW_HEIGHT;
    const isPrev = displayListNum > 1 && listRef.current.scrollTop <= (displayListNum - 1) * COUNT_PER_LOAD * ROW_HEIGHT;
    const index = Math.round(listRef.current.scrollTop / ROW_HEIGHT / COUNT_PER_LOAD);
    if(isNext) {
      setDisplayListNum(index + 1)
    } else if (isPrev) {
      setDisplayListNum(index <= 0 ? 1: index)
    }
  }
  useEffect(() => {
    if(prevSearchWordRef.current === searchWord) {
      handleScroll();
    } else {
      prevSearchWordRef.current = searchWord;
      setDisplayListNum(1)
    }
  }, [scrollPosition, searchWord])
  return (
    <ScrollWrapper ref={listRef}>
      {
        prevHiddenCount > 0 && (
          <div style={{ height: `${prevHiddenCount * 30}px` }}></div>
        )
      }
      <ListWrapper>
        {
          currentItems.map((word:string) => <Item key={word}>{word}</Item>)
        }
      </ListWrapper>
      {
        nextHiddenCount > 0 && (
          <div style={{ height: `${nextHiddenCount * 30}px` }}></div>
        )
      }
    </ScrollWrapper>
  );
};
