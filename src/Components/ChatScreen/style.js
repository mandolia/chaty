import styled from "styled-components";

export const RightSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CrossWrapper = styled.div`
  height: 728px;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 12px;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;

export const Footer = styled.div`
  form {
    display: flex;
    width: min-content;
    justify-content: flex-start;
    margin: 0 auto;
    button {
      width: 100px;
      height: 50px;
      color: #fff;
      height: 50px;
      background-color: #53a8cb;
      border: none;
      border-radius: 4px;
      margin-left: 20px;
    }
    input {
      width: 720px;
    }
  }
`;

export const QuoteWrapper = styled.div`
  display: flex;
  flex-direction: ${({ sender }) => (sender ? "row-reverse" : "row")};
  width: auto;
  align-self: ${({ sender }) => (sender ? "flex-end" : "flex-start")};
  margin: 20px 0px;

  #avatar {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    margin-right: 20px;
    margin-left: 20px;
  }

  #asset {
    width: 95%;
    height: 300px;
    max-height: 500px;
    max-width: 600px;
  }
  #messageWrapper {
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    max-width: 600px;
    img {
      height: 100%;
      margin-bottom: 10px;
    }
  }
  #messageContainer {
    display: flex;
    flex-direction: ${({ sender }) => (sender ? "row-reverse" : "row")};
    align-items: center;
    img {
      cursor:pointer;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  #info {
    display: flex;
    flex-direction: row;
    justify-content: ${({ sender }) => (sender ? "flex-end" : "flex-start")};
    margin-bottom: 10px;
    width: auto;
    max-width: 600px;
    h1 {
      font-family: Roboto;
      font-weight: 700;
      font-size: 16px;
      margin: 0;
      margin-right: 20px;
    }
    p {
      font-family: Roboto;
      font-weight: 400;
      font-size: 16px;
      margin: 0;
      margin-left: 10px;
    }
  }

  #message {
    background: ${({ gradientMessage }) =>
      gradientMessage
        ? "linear-gradient(180deg, #F08835 0%, #FF7271 100%)"
        : null};
    background-color: ${({ sender }) => (sender ? " #F8F8F8" : " #164664")};
    border-radius: ${({ sender }) =>
      sender ? " 20px 0px 20px 20px" : "0px 20px 20px 20px"};
    box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
    height: auto;
    width: auto;
    max-width: 600px;
    opacity: ${({ read }) => (read ? 1 : 0.5)};
    p {
      font-weight: 400;
      font-size: 20px;
      margin: 20px;
      color: ${({ sender }) => (sender ? "#4A4A4A" : "#fff")};
      line-break: anywhere;
    }
  }
`;
