import { Link } from '@inertiajs/react'

export const Header = () => {
  return (
    <header className='backdrop-blur px-4 sm:px-10 h-20 flex items-center justify-between w-full sticky top-0'>
      <div>
        <Link href='/preferences/lang' className='uppercase tracking-widest'>
          <span className='mr-4'>🇺🇸</span>
          <span>en-US</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
