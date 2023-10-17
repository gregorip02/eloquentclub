import { useCsrfToken } from '@/hooks'

export const CsrfInput = () => {
  const token = useCsrfToken()

  return (
    <>
      <input type='hidden' name='_token' value={token} />
    </>
  )
}

export default CsrfInput
