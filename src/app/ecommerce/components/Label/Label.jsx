export default function Label({required ,className,children}){
    return(
       <div className="text-sm lg:text-base h-fit">
        <label>{children}</label>
        {
            required && <span className="text-red-500">*</span>
        }

       </div>
    )
}