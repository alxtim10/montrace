'use client'
import { categories } from '@/data/constants'
import { ArrowLeft, DollarSign, PiggyBank } from 'lucide-react'
import React, { useState } from 'react'

export default function page() {

  const [selectedCategory, setSelectedCategory] = useState<number>();

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <ArrowLeft
          className='w-4 h-4' />
        <h1 className='font-bold'>Budget</h1>
        <div className='w-4'></div>
      </div>
      <div className='mt-10'>
        <div className='flex items-center gap-4'>
          <PiggyBank />
          <input type="text" placeholder='Title' className='border rounded-lg px-3 py-2 w-full' />
        </div>
        <div className='flex items-center gap-4 mt-3'>
          <DollarSign />
          <input type="text" placeholder='Amount' className='border rounded-lg px-3 py-2 w-full' />
        </div>
        <h1 className='text-md mt-5'>Category</h1>
        <div className='grid grid-cols-1 w-full gap-2 gap-y-3 mt-2'>
          {categories.filter(item => item.typeId === 1).map((item, i) => {
            return (
              <button
                onClick={() => {
                  setSelectedCategory(item.id);
                }}
                key={i} className={`${selectedCategory === item.id ? 'bg-base text-white' : ""} transition-all duration-100 border w-full px-3 py-3 rounded-2xl shadow-md text-sm`}>
                <h1 className='text-center'>{item.name}</h1>
              </button>
            )
          })}
        </div>
        <button className='px-3 py-3 bg-base w-full text-white rounded-xl shadow-sm mt-10'>Submit</button>
      </div>
    </div>
  )
}
