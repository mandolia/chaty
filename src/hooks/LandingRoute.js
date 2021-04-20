import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../Components/LandingLayout';

const LandingRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Layout>
      <Route {...rest} render={(props) => (token ? <Redirect to="/contact" /> : <Component {...props} />)} />
    </Layout>
  );
};

export default LandingRoute;
