import Header from '@/Components/Header'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react'

export const Lang = () => {
  const langs = [
    { text: 'ENGLISH', code: 'en-US', flag: '🇺🇸' },
    { text: 'ESPAÑOL', code: 'es-ES', flag: '🇪🇸' }
  ]

  return (
    <GuestLayout title='Lang preferences' className='relative'>
      <Header>
        <Link href='/' className='tracking-widest'>
          <span className='hover:underline'>BACK</span>
        </Link>
      </Header>

      <div className='flex flex-col gap-2'>
        {langs.map(({ code, text, flag }) => (
          <Link
            key={code}
            as='button'
            method='put'
            data={{ code }}
            href='/preferences/lang'
            className='px-4 sm:px-10 py-4 flex items-center justify-between tracking-widest hover:bg-black/30'
          >
            <span>{flag} {text}</span>
          </Link>
        ))}
      </div>
    </GuestLayout>
  )
}

export default Lang
