import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./navigation";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
//   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
max-width: 1076px;
`;

const Slide = styled.div`
  width: 100%;
  display: flex;
  height: 348px;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) => `translateX(${props.xPosition}px)`}; // (*)
  img {
    width: 100%;
    height: 348px;

  }
`;

function Carousel({
  images,
  setWidth,
  xPosition,
  handleClickPrev,
  handleClicknext
}) {
  const slideRef = useRef();
  useEffect(() => {
    if (slideRef.current) {
      const width = slideRef.current.clientWidth;
      setWidth(width);
    }
  }, [setWidth]);






  return (
    <Wrapper>
      {images.map((data, i) => (
        <Slide xPosition={xPosition} ref={slideRef}>

          <img src={data.img} key={i + 1} />
        </Slide>
      ))}
    
    </Wrapper>
  );
}
export default Carousel;
