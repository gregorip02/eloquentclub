import { ParagraphContract } from '@/types'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import ParagraphMatch from './ParagraphMatch'

interface ParagraphProps {
  paragraph: ParagraphContract
  onListening: (paragraph: ParagraphContract) => void
  onListeningStopped: (paragraph: ParagraphContract) => void
}

export const Paragraph = memo(function ({ paragraph, onListening, onListeningStopped }: ParagraphProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && onListeningStopped) {
        setListening(false)
        onListeningStopped(paragraph)
      }
    }, { root: null, rootMargin: '0px', threshold: 0.6 })

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  const recognition = useMemo(() => {
    const SpeechRecognitionInstance = window.SpeechRecognition || window.webkitSpeechRecognition

    const instance = new SpeechRecognitionInstance()
    instance.lang = 'en-US'
    instance.continuous = true
    instance.interimResults = true

    // This function is triggered each time the SpeechRecognition yields results,
    // with a rate limit of every 100 milliseconds to prevent overwhelming the
    // algorithm.
    instance.onresult = ({ results }: SpeechRecognitionEvent) => {
      const result = results[0][0].transcript || ''
      setTranscript((prev) => {
        if (prev.length === 0) return result
        if (result.length > prev.length) return result
        return prev
      })
    }

    instance.onerror = () => {
      setListening(false)
    }

    return instance
  }, [])

  useEffect(() => {
    if (listening) {
      recognition.start()
      setTranscript('')
      onListening(paragraph)
    }

    if (!listening) {
      recognition.stop()
      onListeningStopped(paragraph)
    }
  }, [listening])

  function handleTap () {
    setListening(!listening)
  }

  return (
    <>
      <div ref={ref} onClick={handleTap} className='px-4 sm:px-10 max-w-2xl mx-auto pt-20 h-screen snap-start'>
        <div className='font-medium text-2xl leading-relaxed sm:text-3xl sm:leading-loose'>
          <ParagraphMatch base={paragraph.text} transcript={transcript} />
        </div>
      </div>
    </>
  )
})

export default Paragraph
