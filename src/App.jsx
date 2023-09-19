import { useDisclosure } from '@nextui-org/react'
import { Header, Modal, Hero, Gallery } from './components'

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className='max-w-[1440px mx-auto]'>
      <Header onOpen={onOpen} />
      <Hero />
      <Gallery />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export default App
