'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Select from 'react-select';

export default function CustomSelect({options,filterType}) {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const router = useRouter();

   function handleChangeDateSelection(el){
    const params = new URLSearchParams(searchParams);
    params.set(filterType,el.value);
    router.replace(`${pathname}?${params}`);
   }
  return (
    <>
      <Select
        options={options}
        onChange={handleChangeDateSelection}
      />
    </>
  );
};