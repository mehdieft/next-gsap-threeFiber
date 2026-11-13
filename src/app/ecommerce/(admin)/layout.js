import AdminNavbar from "../../components/eccomerce/navbar";
import AdminSidebar from "../../components/eccomerce/AdminSidebar/AdminSidebar";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export default async function EcommerceLayout({children}){
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/ecommerce/Login");
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
