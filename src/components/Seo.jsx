import Head from "next/head";
import { heroContent } from "../helpers/consts";

const SEO = ({ pageTitle }) => (
  <>
    <Head>
      <title>{pageTitle && `${pageTitle}`}</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={heroContent.heroDescriptions} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <link rel="icon" href="/favicon.png" />
    </Head>
  </>
);

export default SEO;
