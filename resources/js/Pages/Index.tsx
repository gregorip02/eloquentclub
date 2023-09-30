import Header from '@/Components/Header'
import Paragraph from '@/Components/Paragraph'
import SpeechRecognitionUnsupported from '@/Components/SpeechRecognitionUnsupported'
import Voice from '@/Components/Voice'
import GuestLayout from '@/Layouts/GuestLayout'
import { ParagraphContract } from '@/types'
import { useCallback, useState } from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export const Index = ({ paragraphs }: { paragraphs: ParagraphContract[] }) => {
  const [listening, setListening] = useState(false)

  const onListening = useCallback(() => {
    if (!listening) {
      setListening(true)
    }
  }, [])

  const onListeningStopped = useCallback(() => {
    setListening(false)
  }, [])

  return (
    <GuestLayout title='Practice pronunciation' className='relative'>
      {!SpeechRecognition && <SpeechRecognitionUnsupported />}
      {SpeechRecognition &&
        <section className='relative h-screen overflow-y-auto snap-mandatory snap-y'>
          <Header />
          {paragraphs.map(paragraph => {
            return (
              <Paragraph
                key={`paragraph-${paragraph.id}`}
                paragraph={paragraph}
                onListening={onListening}
                onListeningStopped={onListeningStopped}
              />
            )
          })}
          <Voice listening={listening} />
        </section>}
    </GuestLayout>
  )
}

export default Index
