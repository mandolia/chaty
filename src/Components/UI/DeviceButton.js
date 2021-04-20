import styled from 'styled-components';
import React from 'react';
import Ios from '../../Illustration/IOSICON.svg';
import Android from '../../Illustration/LandingPage/GoogleIcon.svg';

export const DeviceButton = styled.div`
position:relative;
width: 236px;
height: 80px;
margin:auto;

#mark{
  width: 100%;
  height: 100%;
  background: #000000;
  border-radius: 9.6px;
  font-family:Roboto;
  font-size:16px;
  font-weight:400;
  color: #fff;
  cursor: pointer;
  margin:0;

#buttonContent{
    position:absolute;
    left:60px;
    top:10px;
    width:200px;
    height:100%;
    text-align:left;
}

.ButtonMark{
    color:#fff;
    font-size:30px;
    width:100%;
    margin:0;
    text-align:left;
    font-family:Roboto;
    font-weight:500;
  }

span{
    color:#fff;
    width:100%;
    display:inline-block;
    font-size:20px;
    font-family:Roboto;
    font-weight:400;
}

}

  #icon{
   position:absolute;
   margin:0;
   top:15px;
   left:12px;
   width: 36.96px;
   height: 45.3px;
  }

  `;

const DeviceButtonContainer = ({ type, children }) => (

  <DeviceButton>
    <button id="mark">{children}</button>
    {type === 'IOS' ? <img id="icon" src={Ios} /> : <img id="icon" src={Android} />}
  </DeviceButton>

);

export default DeviceButtonContainer;
