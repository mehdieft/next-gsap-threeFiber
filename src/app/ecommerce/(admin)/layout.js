import AdminNavbar from "../../components/eccomerce/navbar";
import AdminSidebar from "../../components/eccomerce/AdminSidebar/AdminSidebar";
import { redirect } from "next/navigation";
import { getCookie } from "@/app/lib/cookies";
import { verifyJWT } from "@/app/lib/utils";

export default async function EcommerceLayout({children}){
    const token = await getCookie("jwt_token");
    const user = token ? await verifyJWT(token) : false;

    if (!user) {
      redirect("/ecommerce");
    }

    return(
      <>
      <AdminNavbar />
      <div className="flex pt-23">

      <AdminSidebar />
      <main className="ecommerce p-4 w-full md:ml-55">
        {children}
      </main>
      </div>
      </>
    )
}