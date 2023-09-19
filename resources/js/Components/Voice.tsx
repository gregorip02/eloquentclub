export const Voice = ({ listening }: { listening: boolean }) => {
  return (
    <section className='px-4 sm:px-10 h-24 grid place-items-center w-full fixed bottom-0 -z-10'>
      <button className='uppercase tracking-widest flex flex-col gap-4 items-center'>
        <span>{listening ? 'LISTENING' : 'TAP TO START'}</span>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M19.5 8.25L12 15.75L4.5 8.25' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>
    </section>
  )
}

export default Voice
