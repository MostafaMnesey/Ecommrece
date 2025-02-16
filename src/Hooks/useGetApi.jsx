import React from 'react'
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
export default function useGetApi(url,queryKey) {
 
  const {data,isLoading}=useQuery({
    queryKey: [queryKey],
    queryFn:getApi,
    cashingTime:1000*60*5,
    fetchingOnMount:false
  });
    async function getApi (){
        return await axios.get(`${url}`);
        }
  
   
      
        
        

  return {data,isLoading}
}
