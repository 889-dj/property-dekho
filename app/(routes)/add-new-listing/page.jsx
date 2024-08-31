'use client'
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import React, { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

function AddNewListing() {
    const [selectedAddress,setSelectedAddress] = useState()
    const [coordinates,setCoordinates] = useState()
    const [loader,setLoader] = useState(false)
    const {user} = useUser()

    const nextHandler = async()=>{
    setLoader(true)
    const { data, error } = await supabase
    .from('listing')
    .insert([
    { address: selectedAddress.label, coordinates: coordinates,createdBy:user?.primaryEmailAddress.emailAddress },
    ])
    .select()

    if(data){
        setLoader(false)
        console.log("new data loaded",data);
        toast("New Address added for listing")
        
    }
    if(error){
        setLoader(false)
        console.log(error);
        Toast("something went wrong")
    }      
        
    }

  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
        <div className='p-10 flex flex-col gap-5 items-center justify-center'>
            <h2 className='font-bold text-2xl'>Add New Listing</h2>
            <div className='p-5 w-full rounded-lg border shadow-md flex flex-col gap-5'>
                <h2 className='text-gray-500'>Enter Address which u wan to list</h2>
                <GoogleAddressSearch
                selectedAddress={value=>setSelectedAddress(value)}
                setCoordinates={value=>setCoordinates(value)}
                />
                <Button 
                disabled={!setSelectedAddress||!coordinates}
                onClick={nextHandler}>{loader?<Loader className='animate-spin'/>:Next}</Button>
            </div>
        </div>
    </div>
  )
}

export default AddNewListing
