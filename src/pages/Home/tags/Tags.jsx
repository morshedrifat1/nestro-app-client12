import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hooks/useAxios';

const Tags = ({setSearchTag}) => {
    const axios = useAxios();
    const {
    data: tags = []
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get('/tags');
      return res.data;
    }
  });
    return (
        <div className='bg-boxbg border border-mainborder rounded-lg p-4'>
            <h1 className="text-base-300 text-2xl font-bold">Tags</h1>
           <div className='flex flex-wrap gap-3 mt-2'>
             {tags.map((tag)=><button onClick={()=>setSearchTag(tag.tag)} className='border bg-subHeading border-mainborder px-2.5 text-navlink text-sm rounded-full cursor-pointer'>{tag.tag}</button>)}
           </div>
        </div>
    );
};

export default Tags;