import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.any,
  Component: PropTypes.node,
};
