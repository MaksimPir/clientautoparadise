import { useCallback } from "react"

export const useHttp=()=>
{
    const request=useCallback(async(url,method='GET',body=null, headers={})=>
    {
        try
        {
            if(body)
            {
                body=JSON.stringify(body);
                headers['Content-Type']='application/json';
            }
            const newUrl="https://serverautoparadise.up.railway.app"+url
            const response= await fetch(newUrl,{method, body, headers});
            const data= await response.json();
            
            return data;
        }
        catch(e)
        {

        }
        
    },[])
    return {request}
}