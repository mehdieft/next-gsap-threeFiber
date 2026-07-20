import AdminNavbar from "../../components/eccomerce/navbar";
import AdminSidebar from "../../components/eccomerce/AdminSidebar/AdminSidebar";
export default function EcommerceLayout({children}){
    return(
      <>
      <AdminNavbar />
      <div className="flex">

      <AdminSidebar />
      <main className="ecommerce p-4 w-full">
        {children}
      </main>
      </div>
      </>
    )
}