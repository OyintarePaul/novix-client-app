import { Button } from "./ui/button"

const Hero = () => {
    return (
        <div className="md:bg-[url('/src/assets/student-bg.png')] bg bg-no-repeat bg-right h-[500px] max-w-6xl mx-auto px-8 sm:px-16 flex items-center">
            <div className="max-w-2xl flex flex-col gap-6 items-start">
                <h1 className="text-[50px] font-bold">Welcome to Novix</h1>
                <p>Streamline your academic journey here in FUO.  We empower you to excel by providing a centralized hub for all your campus needs. Effortlessly access course materials, secure housing, stay informed on official news, and connect with support services.</p>
                <Button>Get Started Now</Button>
            </div>
        </div>
    )
}

export default Hero