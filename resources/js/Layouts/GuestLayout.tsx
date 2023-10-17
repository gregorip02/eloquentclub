import { Head } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

export default function GuestLayout ({ children, title, className }: PropsWithChildren<{ title?: string, className?: string }>) {
  return (
    <>
      <Head title={title} />
      <main className={className}>
        {children}
      </main>
    </>
  )
}
