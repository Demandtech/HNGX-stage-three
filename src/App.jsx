import { useDisclosure } from '@nextui-org/react'
import { Header, Modal, Hero, Gallery } from './components'
import { useSelector } from 'react-redux'

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isAuthenticated } = useSelector((store) => store.features)
  return (
    <>
      <Header onOpen={onOpen} />
      {isAuthenticated ? (
        ''
      ) : (
        <>
          <Hero />
          <Gallery />
        </>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

export default App
