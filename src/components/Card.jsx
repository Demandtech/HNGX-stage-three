/* eslint-disable react/prop-types */
import { Image } from '@nextui-org/react'

const Card = ({ tag, image, index }) => {
  return (
    <div className={`group relative overflow-hidden`}>
      <Image width={'100%'} src={image} alt='' />
      <div className='absolute -bottom-[100px] z-10 text-center py-5 left-0 right-0 backdrop-blur-md bg-white/20 overflow-hidden rounded-b-[15px] group-hover:bottom-0 transition-all duration-250 flex items-center justify-between px-5'>
        <p className=''>{tag}</p>
        <p>{index + 1}</p>
      </div>
    </div>
  )
}

export default Card
