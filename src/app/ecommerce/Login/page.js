


import { createJWT, verifyJWT } from '@/app/lib/utils.js';
import LoginPage from './login.jsx';
import Toast from '@/app/components/eccomerce/toast.jsx';

export default async function Login({ searchParams }) {
   const params = await searchParams;
   const error = params.error;
   const success = params.success;
 
   

    return (
       <>
      {error && <Toast message={error} type="error" />}
      {success && <Toast message={success} type="success" />}
       <LoginPage/>
       </>
    );
}