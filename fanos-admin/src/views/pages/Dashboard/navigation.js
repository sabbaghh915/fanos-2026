import React from "react";
import styled from "styled-components";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  Image: {
    "@media(max-width:1335px)": {
      width: "32px",
      height: "32px",
    },

  },
}));
const Wrapper = styled.div`
  display: block;
  padding: 1rem;
  width: 300px;
  background-color: #000;
  opacity: 0.7;
`;

const List = styled.ul`
  list-style: none;
`;

const Button = styled.div`
  position: absolute;
  top: 400px;
  z-index: 10;
  cursor: pointer;
  font-size: 15px;
  transform: translateY(-50%);
  left: ${(props) => props.side === "prev" && 10}%;
  right: ${(props) => props.side === "next" && 10}%;
`;
function Navigation({ handleClickPrev, handleClicknext }) {
  const classes = useStyles();
  return (
    <>
      <Button side="prev" onClick={handleClickPrev} classN>
        <img src="/images/leftArrow.svg" className={classes.Image} />
      </Button>
      <Button side="next" onClick={handleClicknext}>
        <img src="/images/rightArrow.svg" className={classes.Image} />
      </Button>
    </>
  );
}
export default Navigation;
