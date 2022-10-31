import Login from "../../components/Vote/login";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
      // Will be passed to the page component as props
    },
  };
}

export default Login