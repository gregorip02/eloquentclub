import { useMemo, useState } from 'react'
import { v4 } from 'uuid'

export const ParagraphMatch = ({ base, transcript }: { base: string, transcript: string }) => {
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
      match: Boolean(transcriptParagraph[index]) && word.toLowerCase().includes(transcriptParagraph[index])
    }))
  }, [base, transcript])

  return (
    <>{matches.map(({ key, word, match }) => {
      return <span key={key} className={match ? 'text-white' : 'text-white/20'}>{word}{' '}</span>
    })}
    </>
  )
}

export default ParagraphMatch
