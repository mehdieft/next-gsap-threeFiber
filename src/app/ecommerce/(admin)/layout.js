import AdminNavbar from "../../components/eccomerce/navbar";
import AdminSidebar from "../../components/eccomerce/AdminSidebar/AdminSidebar";
export default function EcommerceLayout({children}){
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