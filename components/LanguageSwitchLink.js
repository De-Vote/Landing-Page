import languageDetector from '../lib/languageDetector'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LanguageSwitchLink = ({ locale, ...rest }) => {
  const router = useRouter()

  let href = rest.href || router.asPath
  let pName = router.pathname
  Object.keys(router.query).forEach((k) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale)
      return
    }
    pName = pName.replace(`[${k}]`, router.query[k])
  })
  if (locale) {
    href = rest.href ? `/${process.env.GHPAGE_ROUTE}/${locale}${rest.href}` : pName
  }

  return (
    <Link
      href={href}
      passHref legacyBehavior
      style={{boxSizing:'border-box'}}>
      <button style={{ all:'unset', width:'100%' }} onClick={() => languageDetector.cache(locale)}>{locale}</button>
    </Link>
  );
};

export default LanguageSwitchLink