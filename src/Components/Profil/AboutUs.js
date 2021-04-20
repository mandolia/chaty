import React from 'react';
import ProfilButton from '../UI/ProfilButton';
import * as Style from './style';
import aboutUslogo1 from '../../Illustration/Headerlogo.svg';
import aboutUslogo2 from '../../Illustration/poweredbyintouch.svg';

const AboutUs = ({ setOpen }) => (
  <>
    <Style.AboutContainer>
      <h1>About Us</h1>
      <img alt="logo" id="logo1" src={aboutUslogo1} />
      <p>
        Enjoee Messanger
        <br />
        {' '}
        Version 1.0
      </p>
      <p>@ 2017 EnjoeeLab</p>
      <img alt="logo" id="logo2" src={aboutUslogo2} />
      <ProfilButton onClick={() => setOpen(false)}>Close</ProfilButton>
    </Style.AboutContainer>
  </>
);

export default AboutUs;
