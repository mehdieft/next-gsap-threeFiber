export default function GsapLayout({children}){
    return(
        <>
        <div className="bg-red-400 h-screen w-screen flex justify-center items-center">
            {children}
        </div>
        </>
    )
}