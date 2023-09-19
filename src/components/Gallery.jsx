import { useCallback, useState } from 'react'
import { images } from '../data'
import Card from './Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Gallery = () => {
  const [items, setItems] = useState(images)

  const renderCard = useCallback((card, index) => {
    return (
      <Draggable
        key={card.id.toString()}
        draggableId={card.id.toString()}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              key={card.id}
              index={index}
              id={card.id}
              tag={card.tag}
              image={card.img}
            />
          </div>
        )}
      </Draggable>
    )
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return // Item was dropped outside of the list
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const updatedImages = [...items]
    const [movedItem] = updatedImages.splice(startIndex, 1)
    updatedImages.splice(endIndex, 0, movedItem)

    setItems(updatedImages)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='text-center mb-8'>
        <h3 className='text-2xl'>Photography artwork examples </h3>
        <p className='text-gray-500'>
          See the best shots, that we’ve arranged into a portfolio
        </p>
      </div>
      <Droppable droppableId='gallery' direction='horizontal'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-8 lg-px-20'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}
          >
            {items.map((card, index) => {
              return renderCard(card, index)
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Gallery
