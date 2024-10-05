import Aos from "aos";
import { useEffect } from "react";
// import "../styles/index.scss";
import "../styles/global.css";
import dynamic from "next/dynamic";
import ContextProvider from "../Context/ContextProvider";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useRouter } from "next/router";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!router.pathname.startsWith("/resume")) {
      import("../styles/index.scss");
      // import("../styles/global.css");
      Aos.init({ duration: 1200 });
    }
  }, [router.pathname]);
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
      <ContextProvider>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
