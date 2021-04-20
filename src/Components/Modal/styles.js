import styled, { keyframes } from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalFadeInKeyframes = keyframes`
  0% {
    transform: scale3d(0.1, 0.1, 1);
  }

  55% {
    transform: scale3d(0.55, 0.55, 1);
  }

  75% {
    transform: scale3d(0.75, 0.75, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
`;

export const Modal = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  width: 70%;
  max-width: 800px;
  animation: ${ModalFadeInKeyframes} 250ms linear;
  overflow-x: auto;
  max-height: 90%;
  padding:20px;
  #button {
    width:70%;
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    button:nth-of-type(2) {
      border: 1px solid red;
      border-radius:10px;
      color: red;
    }
    button:nth-of-type(1) {
      border: 1px solid green;
      border-radius:10px;

      color: green;
    }
  }

  .content {
    padding: 30px 80px;
  }
`;

export const ModalHeader = styled.div`
  background-color: gray;

  padding: 30px 80px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  text-align: center;

  > h1 {
    margin-bottom: 16px;
    font-size: 34px;
    font-weight: normal;
    color: #000;
  }

  > p {
    color: gray;
    font-size: 16px;
    font-weight: 300;
  }
`;
