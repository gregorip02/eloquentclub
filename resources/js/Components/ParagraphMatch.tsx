import { v4 } from 'uuid'
import { memo, useMemo } from 'react'

export const ParagraphMatch = memo(({ base, transcript }: { base: string, transcript: string }) => {
  const baseParagraph = useMemo(() => base.split(' ').map((word) => ({
    word,
    key: v4(),
    match: false
  })), [base])

  const matches = useMemo(() => {
    const transcriptParagraph = transcript.split(' ')
    return baseParagraph.map(({ word, key }, index) => ({
      key,
      word,
      match: Boolean(transcriptParagraph[index]) && word.toLowerCase().includes(transcriptParagraph[index].toLowerCase())
    }))
  }, [base, transcript])

  return (
    <>{matches.map(({ key, word, match }) => {
      return <span key={key} className={match ? 'text-white' : 'text-white/40'}>{word}{' '}</span>
    })}
    </>
  )
})

export default ParagraphMatch
