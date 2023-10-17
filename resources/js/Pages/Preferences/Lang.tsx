import CsrfInput from '@/Components/CsrfInput'
import GuestLayout from '@/Layouts/GuestLayout'

export const Lang = () => {
  const langs = [
    { text: 'ENGLISH', code: 'en-US', flag: '🇺🇸' },
    { text: 'ESPAÑOL', code: 'es-ES', flag: '🇪🇸' }
  ]

  return (
    <GuestLayout title='Lang preferences' className='relative'>
      <form method='post'>
        <CsrfInput />
        {langs.map(({ code, text, flag }) => (
          <button type='submit' name='lang' value={code} key={code}>{text} {flag}</button>
        ))}
      </form>
    </GuestLayout>
  )
}

export default Lang
