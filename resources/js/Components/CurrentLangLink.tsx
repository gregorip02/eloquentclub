import { Link } from '@inertiajs/react'

function currentLang (): [string, string, string] {
  const langs = {
    'en-US': { text: 'English', flag: '🇺🇸' },
    'es-ES': { text: 'Español', flag: '🇪🇸' }
  }

  // The location path must be "/{lang}/{slug}" for example "/en-US/DkRuPMoAIU7m"
  // so we need to get the "/{lang}/" parameter.
  const code = window.location.pathname.split('/').at(1) as keyof typeof langs

  const { flag, text } = langs[code] || langs['en-US']

  return [flag, text, code]
}

export const CurrentLangLink = () => {
  const [flag, text] = currentLang()

  return (
    <Link href='/preferences/lang' className='uppercase tracking-widest'>
      <span className='mr-4'>{flag}</span>
      <span className='hover:underline'>{text}</span>
    </Link>
  )
}

export default CurrentLangLink
