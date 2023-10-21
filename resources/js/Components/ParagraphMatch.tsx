import { v4 } from 'uuid'
import { memo, useEffect, useMemo } from 'react'
import { transferableAbortSignal } from 'util'

/**
 * This function normalizes the provided string. It first applies Unicode normalization
 * form to decompose accented characters, then removes these accents by applying a regex match
 * for diacritic marks (which are in the range \u0300-\u036f). Following that, it removes all
 * non-word and non-space characters with another regex match. Finally, the function converts
 * the resulting string to lower case.
 */
function normalize (str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]|_/g, '').toLowerCase()
}

interface ParagraphMatchProps {
  base: string;
  transcript: string;
  onTranscriptFinished?: () => void
}

export const ParagraphMatch = memo(({ base, transcript, onTranscriptFinished }: ParagraphMatchProps) => {
  const baseParagraph = useMemo(() => base.split(' ').map((word) => ({
    word,
    key: v4(),
    match: false
  })), [base])

  const transcriptParagraph = useMemo(() => transcript.split(' '), [transcript])

  useEffect(() => {
    if (onTranscriptFinished && transcriptParagraph.length >= baseParagraph.length) {
      onTranscriptFinished()
    }
  })

  const matches = useMemo(() => {
    return baseParagraph.map(({ word, key }, index) => {
      const transcriptWord = normalize(transcriptParagraph[index] ?? '')
      const normalizedWord = normalize(word)

      return {
        key,
        word,
        match: Boolean(transcriptWord) && normalizedWord.includes(transcriptWord)
      }
    })
  }, [transcript])

  return (
    <>{matches.map(({ key, word, match }) => {
      return <span key={key} className={match ? 'text-white' : 'text-white/40'}>{word}{' '}</span>
    })}
    </>
  )
})

export default ParagraphMatch
