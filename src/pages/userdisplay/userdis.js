import React from 'react'
import Image from 'next/image';
import logo from "@/assets/logo.svg"
import Router from 'next/router';
const userdis = () => {
    const handleSubmit = (value) => {
        Router.push(`/${value}`);
      };
  return (
    <>
      <div className='overflow-x-auto'>
        <div className='max-h-screen overflow-y-auto'>
          <div className="flex justify-center items-center">
          <button
              className="uppercase border  text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit('addscreen')}
            >
              Questions
            </button>
            <Image src={logo} className="h-[100px] pb-5" />
            <button
              className="uppercase border  text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit('userdisplay')}
            >
             Users
            </button>
      </div>
      </div>
          </div>
         
     <div className="flex-1 rounded bg-[#1F1F1F] p-2 text-2xl text-center text-white h-20 border"></div>
     <div className='flex'>
      <div className="flex-1 rounded bg-[#1F1F1F] p-2 text-2xl text-center text-white h-20 border">
        <table>
            <thead>
            <tr className='text-white '>
            
            </tr>
                        
            
            </thead>
        </table>
      </div>
      <div className="flex-1 border rounded bg-[#1F1F1F] p-2 text-2xl text-center text-white"> 
      </div>
      </div>
    
   

    
  
  </>
  )
}

export default userdis