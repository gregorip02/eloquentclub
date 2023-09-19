import Header from '@/Components/Header'
import Paragraph from '@/Components/Paragraph'
import Voice from '@/Components/Voice'
import GuestLayout from '@/Layouts/GuestLayout'
import { useCallback, useState } from 'react'

export const Index = () => {
  const [paragraphs] = useState([
    { id: 1, text: 'Throughout history, humans have been characterized by their incredible capacity to adapt and overcome challenges. This is evident in everything from the evolution of our physical abilities to our mental prowess.' },
    { id: 2, text: "The weather today is absolutely beautiful, I can't wait to go for a walk later in the park with my dog." },
    { id: 3, text: 'Yesterday, I had the most amazing pasta at the new Italian restaurant downtown. It was incredibly delicious!' },
    { id: 4, text: "I am planning to travel abroad next year, and I'm very excited about exploring different cultures and cuisines." },
    { id: 5, text: "My sister has recently started painting and her artwork is truly stunning. I'm so proud of her talent." },
    { id: 6, text: "Every morning, I enjoy reading the newspaper while having my coffee. It's a peaceful start to my day." },
    { id: 7, text: "I think it's essential to spend time with friends and family, as those relationships are vital for our wellbeing." }
  ])

  const [listening, setListening] = useState(false)

  const onListening = useCallback(() => {
    setListening(true)
  }, [])

  const onListeningStopped = useCallback(() => {
    setListening(false)
  }, [])

  return (
    <GuestLayout title='Start talking' className='relative'>
      <Header />
      <section className='h-screen overflow-y-auto snap-mandatory snap-y overscroll-y-none [&>*:last-child]:h-screen'>
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
      </section>
      <Voice listening={listening} />
    </GuestLayout>
  )
}

export default Index
