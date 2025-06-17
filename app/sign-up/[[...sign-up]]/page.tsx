import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md">
            <SignUp />
        </div>
    </div>
}