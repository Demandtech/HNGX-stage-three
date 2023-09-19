import { useDisclosure } from '@nextui-org/react'
import { Header, Modal, Hero, Gallery } from './components'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from './redux.jsx/actions'

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useDispatch()

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      dispatch(loginUser(JSON.parse(user)))
    }
  }, [])

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
