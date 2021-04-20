import React, { useCallback, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Wrapper } from '../../Common/Layout';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchMyData } from '../../store/Me/action';


const Layout = ({ children, fetchMyData }) => {
  const dispatch = useDispatch()
  const me = useSelector((state) => state.MeReducer.Me);
  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall]);

  return <Wrapper>
    <NavBar me={me} />
    {children}
    <Footer />
  </Wrapper>

}

export default connect(null,
  {
    fetchMyData,

  })(Layout);