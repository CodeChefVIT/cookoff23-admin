import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "@/assets/logo.svg"
import Image from "next/image";
import RefreshToken from '@/utils/RefreshToken';
import Router from 'next/router';

const Users = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      await RefreshToken();
      try {
        const round = '1';
        const access_token = localStorage.getItem('access_token');

        const response = await axios.get('https://api-cookoff-prod.codechefvit.com/admin/getallusers', {
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

  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  return (
    <>
      <div className='overflow-x-auto'>
        <div className='max-h-screen overflow-y-auto'>
          <div className="flex justify-center items-center">
            <button
              className="uppercase border  text-white py-2 px-4 rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit('addscreen')}
            >
              Questions
            </button>
            <Image src={logo} className="h-[100px] pb-5" />
          </div>

          <table className='min-w-full table-auto bg-gray-950'>
            <thead>
             
                    <tr className='text-white border-b border-t'>
                        <th className='px-2 py-4 text-left'>Name</th>
                        <th className='px-2 py-4 text-left'>Email</th>
                        <th className='px-2 py-4 text-left'>RegNo</th>
                        <th className='px-2 py-4 text-left'>UserRole</th>
                  
              </tr>
            </thead>
            <tbody className='text-white'>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className='px-5 py-2'>{item.name}</td>
                  <td className='px-4 py-2'>{item.email}</td>
                  <td className='px-4 py-2'>{item.regNo}</td>
                  <td className='px-4 py-2'>{item.userRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
