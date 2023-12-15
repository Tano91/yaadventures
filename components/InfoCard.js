import Image from 'next/image'
import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'

const InfoCard = ({index, img, parish, address, title, description, type, star, price, long, lat}) => {
  return (
    <div className='flex py-7 px-2 pr-4 cursor-pointer hover:bg-emerald-50 hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t'>
        
        <div className='relative h-30 w-60 md:h-52 md:w-80 flex-shrink-0'>
            <Image
                className='rounded-2xl'
                src={img}
                fill
                style={{objectFit: 'cover'}}
                alt={`${title} - Image`}
                priority
                sizes="500px"
            />
        </div>

        <div className='flex flex-col flex-grow pl-5'>
            <div className='flex justify-between'>
                <p className='text-gray-500'>{parish}</p>
                <HeartIcon
                className='h-6 cursor-pointer'
                />
            </div>

            <h4 className='text-xl'>{title}</h4>
            <div className='border-b w-10 pt2' />
            <p className='pt-2 text-sm text-gray-500 flex-grow'>{description}</p>
            <div className='flex justify-between items-end pt-5'>
                <p className='flex items-center'>
                    <StarIcon className='h-5 text-emerald-600' />
                    {star}
                </p>

                <div className=''>
                    <p className='text-lg lg:text-2xl font-semibold pb-2'>
                        ${price}
                    </p>
                    <p className='text-right font-extralight'>
                        JMD
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoCard