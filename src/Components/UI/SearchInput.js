import React from 'react';
import { Input, Container } from './style';
import SearchIcon from '../../Illustration/searchicon.svg';

const SearchInput = ({
  placeholder, name, iconSearch, ...props
}) => (
  <Container>
    <Input
      type="text"
      name={name}
      placeholder={placeholder}
      {...props}
    />
    {iconSearch ? <span><img alt="Search" src={SearchIcon} /></span> : <span />}
  </Container>
);

export default SearchInput;
