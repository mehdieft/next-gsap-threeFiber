import {prisma} from '@/app/lib/prisma';
import EditUser from '../EditUser';
export default async function getUserForEdit({params}){
    const p=await params
    console.log("this is p",p)
    const userId=p.userId
    const findedUser=await prisma.adminUser.findUnique({
        where:{id:Number(userId)}
    })
    console.log("finded user",findedUser);
    return(
        <>
     {userId}
        <h1>wellcome to edit</h1>
        <EditUser user={findedUser} />
        </>
    )
}