import {prisma} from '@/app/lib/prisma';
import EditUser from '../EditUser';
import Toast from '@/app/components/eccomerce/toast';
export default async function getUserForEdit({params,searchParams}){
    const p=await params
    console.log("this is p",p)
    const error=(await searchParams).error
    const userId=p.userId
    const findedUser=await prisma.adminUser.findUnique({
        where:{id:userId}
    })
    // console.log("finded user",findedUser);
    return(
        <>
     {error && <Toast type="error" message={error} />}
        <h1>wellcome to edit</h1>
        <EditUser user={findedUser} />
        </>
    )
}