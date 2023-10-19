import { Link } from '@inertiajs/react'

function currentLang (): [string, string] {
  const langs = {
    'EN-US': { text: 'English', flag: '🇺🇸' },
    'ES-ES': { text: 'Español', flag: '🇪🇸' }
  }

  // The location path must be "/{lang}/{slug}" for example "/en-US/DkRuPMoAIU7m"
  // so we need to get the "/{lang}/" parameter.
  const currentLangCode = window.location.pathname.split('/').at(1)?.toUpperCase() as keyof typeof langs

  const { flag, text } = langs[currentLangCode]

  return [flag, text]
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
