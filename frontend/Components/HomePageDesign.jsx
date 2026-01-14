import React from 'react'
import Image from 'next/image'

import { MdLanguage } from "react-icons/md"
import { HiOutlineViewList } from "react-icons/hi"
import { BsRobot } from "react-icons/bs"
import PDFForm from './PDFForm'

const HomePageDesign = () => {
  return (
    <div className='bg-blue-50 min-w-screen overflow-x-hidden min-h-screen  pt-10 2xl:pt-20'>

        <Image src="/Logo.png" alt="Logo" width={100} height={100} className='mx-auto '/>
        <h1 className='text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center mt-5 text-gray-700 mx-2'>
            AI-Powered PDF Summarizer
</h1>
        <p className='text-center text-gray-600 my-5 mx-2 text-[10px] sm:text-sm lg:text-lg xl:text-xl '>
            Upload your PDF and get a concise summary instantly!
            </p>

      <section className='flex justify-center text-wrap gap-3  sm:gap-10 text-gray-700'>
        <div className='flex items-center gap-2'>
          <MdLanguage className='text-2xl text-blue-600' />
          <p className='text-[12px] sm:text-lg lg:text-xl xl:text-2xl'>Multi-language</p>
        </div>

        <div className='flex items-center gap-2'>
          <HiOutlineViewList className='text-2xl text-blue-600' />
          <p className='text-[12px] sm:text-lg lg:text-xl xl:text-2xl'>Bullet points</p>
        </div>

        <div className='flex items-center gap-2'>
          <BsRobot className='text-2xl text-blue-600' />
          <p className='text-[12px] sm:text-lg lg:text-xl xl:text-2xl'>AI-powered</p>
        </div>

      </section>
      <PDFForm/>
            
     </div>
  )
}

export default HomePageDesign
