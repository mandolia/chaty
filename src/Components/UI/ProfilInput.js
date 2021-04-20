import React from 'react';
import * as Style from './style';

const ProfilInput = ({
  placeholder, name, iconSearch, label, ...props
}) => (
  <Style.Container>
    <p id="label">{label}</p>
    <Style.ProfilInput
      type="text"
      name={name}
      placeholder={placeholder}
      {...props}
    />
  </Style.Container>
);

export default ProfilInput;
