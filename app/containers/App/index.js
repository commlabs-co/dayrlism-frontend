/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - (There is a Reason) a positive attitude can change everything"
        defaultTitle="DAYRLISM"
      >
        <meta
          name="description"
          content="Dayrl, a full stack JS developer, he will develop a fully funcitional web application from backend(NodeJS) to the frontend. In addition, he's major in work are mostly in Frontend Development, with ReactJS ES6 or Typescript, he will get involve as well in backend whenever there is a need of his expertise."
        />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route path="/features" component={FeaturePage} /> */}
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
