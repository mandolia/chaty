import React from 'react';
import ProfilButton from '../UI/ProfilButton';
import { ConditionContainer } from './style';

const Condition = ({ setOpen }) => <ConditionContainer>
  <h1>Terms & Conditions</h1>
  <ul>
    <li> 1. Introduction </li>
    <li>1.1 These terms and conditions shall
      govern your use of our Messanger Application. </li>
    <li>1.2.By using our website, you accept these terms and
    conditions in full; accordingly, if you disagree with these terms and
    conditions or any part of these terms and conditions,
    you must not use our website.
      </li>
    <li>1.3.If you [register with our website, submit any material
    to our website or use any of our website services],
    we will ask you
    to expressly agree to these terms and conditions.
      </li>
    <li>1.4You must be at least [18] years of age to use our website;
    and by using our website or agreeing to these terms and
    conditions, you warrant and represent to us that you are at
    least[18] years of age.
      </li>
    <li>1.5.Our website uses cookies; by using our website or agreeing
    to these terms and conditions, you consent to our use of
    cookies in accordance with the terms of our[privacy and cookies policy].
      </li>
    <li>2.Credit</li>
    <li>2.1.This document was created using a template
    from SEQ Legal (http://www.seqlegal.com). You must retain the above
    credit, unless you purchase a licence to use this document without
    the credit.You can purchase a licence at:
    http://www.website-contracts.co.uk/seqlegal-licences.html. Warning:
    use of this document without the credit, or
    without purchasing a licence, is an infringement of copyright.
      </li>
    <li>3.Copyright notice</li>
    <li>3.1.Copyright (c) [year(s) of first publication] [full name].</li>

    <li>3.2.Subject to the express provisions of these terms and conditions:
        <br />(a)we, together with our licensors,
         own and control all the copyright and other intellectual property
        rights in our website
        and the material on our website;
      <br />(b)and all the copyright and other intellectual property rights
         in our website and the material on our website are reserved.
      </li>

    <li>4.Licence to use website</li>

    <li>4.1.You may:
        <br />
        (a)view pages from our website in a web browser;
        <br />
        (b)download pages from our website for caching in a web browser;
        <br />
        (c)print pages from our Application;
        <br />
        (d)[stream audio and video files from our Application; and]
        <br />
        (e)[use [our website services] by means of a web browser,]
        <br />
    </li>
  </ul>
  <ProfilButton onClick={() => setOpen(false)}>Close</ProfilButton>
</ConditionContainer>;

export default Condition;
