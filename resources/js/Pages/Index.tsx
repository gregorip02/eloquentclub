import Header from '@/Components/Header'
import Paragraph from '@/Components/Paragraph'
import Voice from '@/Components/Voice'
import GuestLayout from '@/Layouts/GuestLayout'

export const Index = () => {
  return (
    <GuestLayout title='Start talking' className='min-h-screen flex flex-col relative'>
      <Header />
      <Paragraph />
      <Voice />
    </GuestLayout>
  )
}

export default Index
