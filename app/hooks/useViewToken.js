import {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { createToken } from '@/database/actions/token.action';

export const useViewToken = (hostIdentity) => {

    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [identity, setIdentity] = useState(null);




    useEffect(()=>{
   const createViewerToken = async () => {
     try {
        const viewrToken= await createToken(hostIdentity);
        setToken(viewrToken);
        const decodedToken = jwtDecode(viewrToken);

        const name = decodedToken.name;
        const identity= decodedToken.jti


        if(identity)
        {
            setIdentity(identity);
        }
        if(name)
        {
            setName(name);
        }

    } catch (error) {
        console.log('something went wrong', error)
    }
   }
    createViewerToken();

    },[hostIdentity])

    return {token, name, identity};
}