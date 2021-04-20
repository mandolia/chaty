import React from 'react';
import { Link } from 'react-router-dom';
import * as Style from './style';
import FooterButton from '../UI/FooterButton';
import share from '../../Illustration/handsicon.svg';
import Logo from '../../Illustration/hichatylogo.svg';

const Share = () => (
  <Style.AuthWrapper>
    <Style.LeftContainer>
      <img src={Logo} />
    </Style.LeftContainer>
    <Style.Formcontainer>
      <div>
        <img src={share} />
        <span>
          We request you to all Enjoee users, share with your
          friends and familyand make successfull of Enjoee
          {' '}
          <br />
        </span>
        <span>  Welcome to Enjoee Family</span>

        <Style.ButtonContainer>
          <FooterButton>Submit</FooterButton>
          <Link id="cancel" to="/contact">Cancel</Link>
        </Style.ButtonContainer>
      </div>
    </Style.Formcontainer>

  </Style.AuthWrapper>
);

export default Share;
