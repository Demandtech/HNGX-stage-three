import { useEffect, useState, useRef } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import { toggleLoading } from '../redux.jsx/actions'
import { useDispatch } from 'react-redux'

const Gallery = () => {
  const { isAuthenticated, images, isLoading } = useSelector(
    (store) => store.features
  )
  const [items, setItems] = useState(images)
  const dispatch = useDispatch()

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const dragStart = (e, position) => {
    console.log(position)
    dragItem.current = position
    console.log(dragItem.current)
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
    console.log(dragOverItem)
  }

  const drop = () => {
    const copyImages = [...items]
    const dragItemContent = copyImages[dragItem.current]
    copyImages.splice(dragItem.current, 1)
    copyImages.splice(dragOverItem.current, 0, dragItemContent)
    // dragItem.current = null
    // dragOverItem.current = null
    setItems(copyImages)
  }

  useEffect(() => {
    dispatch(toggleLoading(true))
    setItems(images)

    setTimeout(() => {
      dispatch(toggleLoading(false))
    }, 2000)
  }, [images, dispatch])

  if (isLoading) {
    return (
      <Oval
        height={80}
        width={80}
        color='#4fa94d'
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          background: '#d8dbde',
          zIndex: 1000000,
        }}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#4fa94d'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    )
  }

  return (
    <div className='mb-20'>
      <div className='text-center mb-8'>
        <h3 className='text-2xl'>Photography artwork examples </h3>
        <p className='text-gray-500'>
          See the best shots, that we’ve arranged into a portfolio
        </p>
        {isAuthenticated ? (
          <p className='text-gray-300 mt-10'>
            {images.length > 0 ? 'You can rearrange image' : 'No Item Found'}
          </p>
        ) : (
          <p className='text-gray-300 mt-10'>
            {images.length > 0 ? 'Login Rearrange Image' : 'No Item Found'}
          </p>
        )}
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-8 lg-px-20'>
        {items.map((card, index) => {
          return (
            <div key={card.id}>
              {isAuthenticated ? (
                <div
                  draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  onTouchStart={(e) => dragStart(e, index)}
                  onTouchMove={(e) => dragEnter(e, index)}
                  onTouchEnd={drop}
                  className='cursor-grab'
                >
                  <Card
                    index={index}
                    id={card.id}
                    tag={card.tag}
                    image={card.img}
                  />
                </div>
              ) : (
                <Card
                  key={card.id}
                  index={index}
                  id={card.id}
                  tag={card.tag}
                  image={card.img}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Gallery
