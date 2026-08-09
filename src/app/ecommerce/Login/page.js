


import { createJWT, verifyJWT } from '@/app/lib/utils.js';
import LoginPage from './login.jsx';
import Toast from '@/app/components/eccomerce/toast.jsx';

export default async function Login({ searchParams }) {
     const error=(await searchParams).error
 
   

    return (
       <>
       {error && <Toast message={error} type="error" />}
       <LoginPage/>
       </>
    );
}