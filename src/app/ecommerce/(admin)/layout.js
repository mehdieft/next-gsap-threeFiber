import AdminNavbar from "../components/navbar";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
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