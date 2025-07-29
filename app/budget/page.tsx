'use client'
import { toast } from '@/components/ui/use-toast';
import { categories, type } from '@/data/constants'
import { BudgetRequestType } from '@/interface/budget';
import { ArrowLeft, DollarSign, PiggyBank } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation';
import { setuid } from 'process';
import React, { useEffect, useState } from 'react'

export default function page() {

  const [refreshToken, setRefreshToken] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const router = useRouter();
  const [userId, setUserId] = useState<number>();
  const [request, setRequest] = useState<BudgetRequestType>({
    name: '',
    nominal: 0,
    spent: 0,
    typeId: 1,
    type_name: '',
    categoryId: 1,
    category_name: '',
    userId: userId ?? 0
  });

  const addBudget = async () => {
    const asd = await fetch("/api/protected/budget", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const res = await asd.json();
    if (res.status == 400) {
      console.log(res.message);
      return;
    }
    toast({
      title: "Success",
      description: "Budget Created",
    });
    setTimeout(redirect, 1200);
  };

  const redirect = () => {
    router.push("/tracker");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem('dompetUserId')
      console.log(id);
      setRequest((prev) => ({
        ...prev,
        userId: Number(id)
      }))
      let userToken = localStorage.getItem("dompetToken");
      if (userToken) {
        setRefreshToken(userToken);
      }
    }
  }, [])

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <ArrowLeft
          onClick={() => {
            router.back();
          }}
          className='w-4 h-4 cursor-pointer' />
        <h1 className='font-bold'>Budget</h1>
        <div className='w-4'></div>
      </div>
      <div className='mt-10'>
        <div className='flex items-center gap-4'>
          <PiggyBank />
          <input
            onChange={(e) => {
              if (e.target.value) {
                setRequest((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            }}
            type="text" placeholder='Title' className='border rounded-lg px-3 py-2 w-full' />
        </div>
        <div className='flex items-center gap-4 mt-3'>
          <h1>Rp</h1>
          <input
            onChange={(e) => {
              if (e.target.value) {
                setRequest((prev) => ({
                  ...prev,
                  nominal: Number(e.target.value)
                }))
              }
            }}
            type="number" placeholder='Amount' className='border rounded-lg px-3 py-2 w-full' />
        </div>
        <h1 className='text-md mt-5'>Category</h1>
        <div className='grid grid-cols-1 w-full gap-2 gap-y-3 mt-2'>
          {categories.filter(item => item.typeId === 1).map((item, i) => {
            return (
              <button
                onClick={() => {
                  setSelectedCategory(item.id);
                  setRequest((prev) => ({
                    ...prev,
                    categoryId: item.id,
                    categoryName: item.name,
                    typeId: item.typeId,
                    typeName: type.find(data => data.id == item.typeId)?.name ?? ''
                  }))
                }}
                key={i} className={`${selectedCategory === item.id ? 'bg-base text-white' : ""} transition-all duration-100 border w-full px-3 py-3 rounded-2xl shadow-md text-sm`}>
                <h1 className='text-center'>{item.name}</h1>
              </button>
            )
          })}
        </div>
        <button
          onClick={addBudget}
          className='px-3 py-3 bg-base w-full text-white rounded-xl shadow-sm mt-10'>Submit</button>
      </div>
    </div>
  )
}
