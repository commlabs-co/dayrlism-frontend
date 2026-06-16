import Aos from "aos";
import { useEffect } from "react";
import "../styles/index.scss";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "nextjs-google-analytics";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={44}
        color="112, 255, 225"
        outerAlpha={0.3}
        innerScale={0.7}
        outerScale={1.2}
      />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
