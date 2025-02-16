import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function uesCatigories() {
    const { data, isLoading,isError,isFetching } = useQuery({
        queryKey: ["catigories",],
        queryFn:  getCatigories,
        cashingTime: 1000*60*5,
        fetchingOnMount: false,
        refetchOnWindowFocus: false
      })
      
      async function getCatigories() {
          return await axios.get(
              "https://ecommerce.routemisr.com/api/v1/categories"
            );
        }
            const allCatigories = data?.data.data;
            
            
  return {allCatigories,isLoading,isError,isFetching}
}
