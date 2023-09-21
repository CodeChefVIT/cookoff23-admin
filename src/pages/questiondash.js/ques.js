import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "@/assets/logo.svg"
import Image from "next/image";
import RefreshToken from '@/utils/RefreshToken';
import Router from 'next/router';
const Ques = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await RefreshToken();
      try {
        const round = '1';
        const access_token = localStorage.getItem('access_token');

        const response = await axios.get('https://api-cookoff-prod.codechefvit.com/ques/getOne', {
          params: {
            round: round,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        

        setData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (postId) => {
    await RefreshToken();
  
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.delete(`https://api-cookoff-prod.codechefvit.com/ques/deleteQuestion/${postId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      console.log(`Deleted post with ID ${postId}`);
      window.location.reload();
      
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  
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
            <Image src={logo} className="h-[100px] pb-5" alt="logo"/>
            <button
              className="uppercase border  text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit('userdisplay')}
            >
             Users
            </button>
      
          </div>
         
          <table className='min-w-full table-auto bg-gray-950 '>
            <thead>
              <tr className=' text-white border-b border-t'>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Objective</th>
                <th className='px-4 py-2'>Input Format</th>
                <th className='px-4 py-2'>Output Format</th>
                <th className='px-4 py-2'>Constraints</th>
                <th className='px-4 py-2'>Round</th>
                
                <th className='px-4 py-2'>Points</th>
              </tr>
            </thead>
            <tbody className='text-white '>
              {data.map((item) => (
                console.log(item._id),
                <tr key={item._id}>
                  <td className='  px-4 py-2'>{item.name}</td>
                  <td className='  px-4 py-5'>{item.objective}</td>
                  <td className='  px-4 py-2'>{item.inputFormat}</td>
                  <td className='  only:px-4 py-2'>{item.outputFormat}</td>
                  <td className='  px-4 py-2'>{item.constraints}</td>
                  <td className='  px-4 py-2'>{item.round}</td>
                 
                  <td className='  px-4 py-2'>{item.points}</td>
                  <td className='px-4 py-2'>
                  <button className="rounded-full border hover:bg-white hover:text-black text-white font-bold py-2 px-4  "  type="button"
                  onClick={() => handleSubmit('addscreen')}>
                  Testcase
                  </button>
                </td>
                <td className='px-4 py-2'>
                <button
                      className="rounded-full border hover:bg-white hover:text-black text-white font-bold py-2 px-4"
                      type="button"
                      onClick={() => {
                        handleDelete(item._id);
                        
                      }}
                    >
                      Delete
                     
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ques;
