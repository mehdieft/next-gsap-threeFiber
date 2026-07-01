import Navbar from "../components/navbar"
import TransitionProvider from "../providers/TransitionProvider"
export default function Layout({ children }) {
    return (
        <>
            <TransitionProvider>

                <Navbar />
                {children}
            </TransitionProvider>

        </>
    )
}