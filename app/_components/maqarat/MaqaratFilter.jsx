'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function MaqaratFilter({query}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    function handleChangeParam(batch){
        const url = new URLSearchParams(params);
        url.set('batch',batch)
        router.replace(`${pathname}?${url}`,{scroll:false});
    }
    return (
      <div className="flex mb-1 ">
        <div className="ml-auto space-x-3">
          <button onClick={()=>handleChangeParam('baneen')} className="px-3 py-1 bg-(image:--gradient-primary) rounded-md text-white text-sm font-bold">Baneen</button>
          <button onClick={()=>handleChangeParam('banaat')} className="px-3 py-1 bg-(image:--gradient-primary) rounded-md text-white text-sm font-bold">Banaat</button>
        </div>
      </div>
    );
}

export default MaqaratFilter
