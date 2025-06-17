import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin text-primary h-10 w-10" />
        </div>
    )
}

export default Loader;