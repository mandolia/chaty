import styled from "styled-components";

export const Wrapper = styled.div`
  width: 360px;
  height: 245px;
  padding: 10.2px;
  position: relative;
  background-color: #ffffff;
  display: flex;
  box-shadow: 0px 0px 5px rgba(126, 126, 126, 0.5);
  border-radius: 4px;
  font-family: Roboto;
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  justify-content: start;

  .profil {
    position: relative;
    cursor: pointer;
    height: 195px;
    width: 360px;
  }

  .noProfil{
    height: 195px;
    width: 360px;
    display: flex;
    background: #47525d;
    h1 {
      margin: auto;
      font-size: 20px;
      font-weight: 700;
      font-family: Roboto;
      line-height: 1.6;
      color: #000;
    }
  }
  .noProfilLock {
    height: 195px;
    width: 360px;
    display: flex;
    background: #47525d;
    opacity: 0.7;
    h1 {
      margin: auto;
      font-size: 20px;
      font-weight: 700;
      font-family: Roboto;
      line-height: 1.6;
      color: #000;
    }
  }
  .PrivateProfil {
    height: 195px;
    width: 360px;
    position: relative;
    .lockProfil {
      height: 195px;
      width: 360px;
      opacity: 0.7;
    }
    .lock {
      position: absolute;
      height: 195px;
      width: 360px;
      z-index: 1000;
      left: 0;
      opacity: 0.7;
    }
  }
`;

export const CardTemModel = styled.div`
  width: 400px;
  height: 240px;
  background-color: #fff;
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  font-family: Roboto;
  justify-content: space-between;
  margin: auto;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  img {
    cursor: pointer;
    margin: 0 5px;
    width: 24px;
    height: 24px;
  }
  > div {
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    height: 100%;
    justify-content: space-evenly;
  }
  ul {
    padding: 0;
    width: 100px;
    list-style: none;
    margin: 0;
    background: #fff;
    z-index: 1000;
    position: absolute;
    top: 100%;
    li {
      border-bottom: 2px solid #000;
      padding: 15px 20px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      font-family: Roboto;
    }
  }
`;
export const PersonalInfo = styled.div`
  width: 50%;
  max-width: 50%;
  margin-right: 2px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 50%;
  > div {
    max-width: 100%;
    margin-right: 3px;
    h1 {
      margin-bottom: 5px;
      font-style: normal;
      font-family: Roboto;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 1.29412px;
    }
    span {
      font-style: normal;
      font-weight: 400;
      font-family: Roboto;
      font-size: 14px;
      line-height: 16px;
      color: #737373;
    }
  }
`;

export const Connected = styled.div`
  width: 12px;
  height: 12px;
  background: ${({ connected }) =>
    connected ? " #38D744" : " rgb(229, 229, 229)"};
  border-radius: 50%;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
  border-radius: 4px;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 120px;
  padding: 5px 5px;
  z-index: 9999;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .red {
    width: 115px;
    height: 40px;
    background: #fb5051;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .green {
    width: 115px;
    height: 40px;
    background: #38d744;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .otp {
    width: 255px;
    margin: 0 auto;
    height: 40px;
    background: #38d744;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

export const CardWrapper = styled.div`
  width: 75%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    font-size: 20px;
    font-weight: 700;
    font-family: Roboto;
    line-height: 1.6;
    color: #000;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    color: #4a4a4a;
    font-family: Roboto;
  }
  button {
    background-color: #53a8cb;
    border: none;
    font-family: Roboto;
    color: #fff;
  }
`;

export const OTPModalContainer = styled.div`
  background: #ffffff;
  padding: 10px;
  opacity: 0.9;
  border: 2px solid #47525d;
  box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
  border-radius: 5px;
  position: absolute;
  text-align: center;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 355px;
  height: 281px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p,
  span {
    font-size: 15px;
    color: #000;
    line-height: 17.58px;
    font-weight: 400;
    margin: 0;
  }
  .pincode-input-container {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
