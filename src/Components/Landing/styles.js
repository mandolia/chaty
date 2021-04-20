import styled from "styled-components";
import Vector from "../../Illustration/vector.svg";

export const Wrapper = styled.div`
  text-align: center;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  h1 {
    width: 686px;
    height: 47px;
    margin: 0 auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 47px;
    margin-bottom: 16px;
    margin-top: 100px;
  }

  span {
    width: 267px;
    height: 28px;
    margin: 0 auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #4a4a4a;
  }

  p {
    width: 748px;
    height: 23px;
    margin: 0 auto;
    margin-top: 4px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    color: #4a4a4a;
  }

  img {
    width: 1110px;
    left: 165px;
    margin-top: 53px;
  }

  h2 {
    width: 483px;
    height: 40px;
    margin: 0 auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;
    color: #4a4a4a;
    margin-top: 29px;
    margin-bottom: 45px;
  }

  #device {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #ffffff;
    text-align: left;
    padding: 100px 0px;

    h2 {
      font-family: Roboto;
      height: auto;
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 48px;
      line-height: 59px;
      margin: 0;
      margin-bottom: 25px;
      color: #4a4a4a;
    }

    p {
      width: 90%;
      height: auto;
      margin: 0;
      font-family: Roboto;
      font-style: normal;
      font-weight: 400;
      font-size: 25px;
      line-height: 31px;
      color: #4a4a4a;
    }

    .phones {
      margin-right: 100px;

      img {
        margin: 0;
        width: 125px;

        :nth-child(1) {
          margin-bottom: 70px;
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-start;
      margin-top: 40px;
      > div {
        margin: 0;

        :nth-child(1) {
          margin-right: 20px;
        }
      }
    }
  }

  h3 {
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 47px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 50px;
    line-height: 59px;
    text-align: center;
    color: #222425;
  }

  #feature {
    width: 1440px;
    height: 1024px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 21.5px;

    .details {
      width: auto;
      height: auto;
      padding: 0 120px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
    }

    #leftSide {
      position: absolute;
      left: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 565px;
      justify-content: center;

      img {
        width: 80px;
        height: 80px;
        margin: 0;
        margin-bottom: 8px;
      }

      h4 {
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: 34px;
        line-height: 40px;
        margin: 0;
        color: #ffffff;
      }

      > div {
        cursor: pointer;
      }

      > div:nth-child(2) {
        margin: 75px 0;
      }
    }

    #rightSide {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 565px;
      justify-content: center;

      img {
        width: 80px;
        height: 80px;
        margin: 0;
        margin-bottom: 8px;
      }

      h4 {
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: 34px;
        line-height: 40px;
        margin: 0;
        color: #ffffff;
      }

      > div {
        cursor: pointer;
      }

      > div:nth-child(2) {
        margin: 75px 0;
      }
    }

    #bar {
      position: absolute;
      height: 100%;
      left: 50%;
      transform: translate(-50%, 0%);
      background: #164664;
      width: 10px;
    }

    .phone {
      width: 375px;
      height: 812px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;
      z-index: 9999;
    }
  }

  #hero {
    width: 800px;
    margin: auto;
  }

  #lastSection {
    background: url(${Vector});
    background-position: center;
    background-repeat: no-repeat;
    height: 270px;
    margin-top: 15px;
    justify-content: space-between;

    #logo {
      width: 75.75px;
      height: 80px;
      margin: 0;
      margin-top: 20px;
    }

    p {
      width: auto;
      height: auto;
      margin: 0 auto;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      letter-spacing: 0.5px;
      color: #9b9b9b;
    }

    button {
      margin: 30px auto;
      background: #53a8cb;
      border-radius: 5px;
      padding: 0 60px;
      height: 50px;
      border: none;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 21px;
      line-height: 25px;
      text-align: center;
      letter-spacing: 0.5px;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

export const DeviceContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.display ? "flex-start" : "flex-end")};
  margin: 5px;
  img {
    width: 117px;
    height: 225px;
    margin: 0px 65px;
  }

  #container {
    text-align: center;
    height: 230px;
    margin-right: ${(props) => (props.display ? "0" : "104px")};
    p {
      width: 360px;
      height: 84px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      color: #4a4a4a;
      margin-bottom: 52px;
    }
  }
`;

export const HeroFeatures = styled.div`
  background-color: #fff;
  padding: 70px 0px;
  display: grid;
  justify-content: center;
  grid-template-columns: 279px 2px 279px 2px 279px;
  grid-template-rows: auto;
  column-gap: 45px;
  margin-top: 50px;

  #grayBorder {
    height: 100px;
    background-color: #47525d;
    align-self: flex-end;
  }
  #blackBorder {
    height: 100px;
    background-color: #000;
  }
`;

export const HeroCard = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 34.5px;
    margin: 0;
  }
  h1 {
    font-family: Roboto;
    width: 100%;
    height: auto;
    margin: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #47525d;
  }

  p {
    width: 100%;
    height: auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 132.4%;
    text-align: center;
    color: #47525d;
  }
`;
