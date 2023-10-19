import { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className='backdrop-blur px-4 sm:px-10 h-20 flex items-center justify-between w-full sticky top-0'>
      {children}
    </header>
  )
}

export default Header
