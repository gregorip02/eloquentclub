import Header from '@/Components/Header'
import Paragraph from '@/Components/Paragraph'
import SpeechRecognitionUnsupported from '@/Components/SpeechRecognitionUnsupported'
import Voice from '@/Components/Voice'
import GuestLayout from '@/Layouts/GuestLayout'
import { ParagraphContract } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import ListeningAudio from '@/../sounds/listening.mp3'
import StopListeningAudio from '@/../sounds/stop-listening.mp3'
import CurrentLangLink from '@/Components/CurrentLangLink'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export const Index = ({ paragraphs: initialParagraphs }: { paragraphs: ParagraphContract[] }) => {
  const [listening, setListening] = useState(false)
  const [paragraphs, setParagraphs] = useState(initialParagraphs)
  const paragraphsRef = useRef(paragraphs)
  const currentLangCode = window.location.pathname.split('/').at(1) || 'en-US'

  const startNotification = useMemo(() => new Audio(ListeningAudio), [])
  const stopNotification = useMemo(() => new Audio(StopListeningAudio), [])

  const onListening = useCallback(() => {
    setListening((prev) => {
      if (!prev) startNotification.play()
      return true
    })
  }, [])

  const onListeningStopped = useCallback(() => {
    setListening((prev) => {
      if (prev) stopNotification.play()
      return false
    })
  }, [])

  async function fetchNextRandomParagraphs (): Promise<ParagraphContract[]> {
    const not = paragraphsRef.current.map(p => p.id).join(':')
    return fetch(`/api/v1/paragraphs/${currentLangCode}/random?not=${not}`).then(res => res.json())
  }

  const onViewportEntered = useCallback(async (paragraph: ParagraphContract) => {
    const scrollFinished = paragraphsRef.current.at(-1)?.id === paragraph.id
    if (scrollFinished) {
      const next = await fetchNextRandomParagraphs()
      setParagraphs(prev => {
        const current = [...prev, ...next]
        paragraphsRef.current = current
        return current
      })
    }
  }, [])

  return (
    <GuestLayout title='Practice pronunciation' className='relative'>
      {!SpeechRecognition && <SpeechRecognitionUnsupported />}
      {SpeechRecognition &&
        <section className='relative h-screen overflow-y-auto snap-mandatory snap-y overscroll-y-none'>
          <Header>
            <CurrentLangLink />
          </Header>
          {paragraphs.map(paragraph => {
            return (
              <Paragraph
                key={`paragraph-${paragraph.id}`}
                paragraph={paragraph}
                onListening={onListening}
                onListeningStopped={onListeningStopped}
                onViewportEntered={onViewportEntered}
              />
            )
          })}
          <Voice listening={listening} />
        </section>}
    </GuestLayout>
  )
}

export default Index
