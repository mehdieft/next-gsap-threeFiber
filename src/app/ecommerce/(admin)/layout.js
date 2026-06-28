import AdminNavbar from "../components/navbar";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
export default function EcommerceLayout({children}){
    return(
      <>
      <AdminNavbar />
      <AdminSidebar />
      <main>
        {children}
      </main>
      </>
    )
}