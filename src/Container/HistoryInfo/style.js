import styled, { css } from "styled-components";

const sharedCss = css`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.809524px;
  color: #000000;
`;

export const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  ${sharedCss}
  .container {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #f8f8f8;
    background-color: #fff;
    .icon {
      display: flex;
      height: inherit;
      align-items: center;
      h1 {
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #47525d;
      }
      > div {
        width: 34px;
        height: 34px;
        margin-right: 20px;
        border: 2px solid #53a8cb;
        border-radius: 50%;
        display: flex;

        img {
          margin: auto;
        }
      }
    }
    td {
      padding-left: 10px;
    }
  }
`;
export const Header = styled.div`
  .avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }
    h1,
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0.809524px;
    }
    h1 {
      text-align: left;
      font-size: 24px;
      line-height: 28px;
      color: #164664;
      margin-bottom: 5px;
    }
    span {
      font-size: 16px;
      line-height: 19px;
      color: #47525d;
    }
  }
  .link {
    display: flex;
    align-items: center;
    flex-direction: row;
    a {
      font-family: Roboto;
      margin-left: 5px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: 0.809524px;
      color: #47525d;
      text-decoration: none;
    }
  }
`;
export const Table = styled.table`
  width: 100%;
`;
export const TableHero = styled.tr`
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
  td {
    padding-left: 10px;
  }
`;
