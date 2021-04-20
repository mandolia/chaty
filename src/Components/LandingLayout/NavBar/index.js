import React from 'react';
import { Link } from 'react-router-dom';
import * as Style from './styles';
import Logo from '../../../Illustration/hichatylogo.svg';

const Header = () => (
  <Style.Wrapper>
    <Style.Logo>
      <Link to="/"><img src={Logo} /></Link>
    </Style.Logo>
    <ul>
      <Link to="/login"><li> Login</li></Link>
      <Link to="/signup"><li>Register</li></Link>
    </ul>
  </Style.Wrapper>
);

export default Header;
