import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { FormEvent } from "react"
import { useCreateAccount } from "../hooks/firebase"
import { Loader2 } from "lucide-react"
import { useAuth } from "../providers/auth-provider"
import { Link, Navigate } from "react-router-dom"
import { useToast } from "./ui/use-toast"
import { User } from "firebase/auth"

export const Signup = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const { mutate: createAccount, isPending } = useCreateAccount();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    createAccount({ email, password }, {
      onSuccess: (data: User) => {
        toast({
          title: "Account created successfully."
        })
        console.log(user)
      }
    })
  }


  if (user != null) return <Navigate to="/" />

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-center mb-4">Create an Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <Button>{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}</Button>
          <Link to="/auth/login" className="text-center">or login instead</Link>
        </div>
      </form>
    </div>
  )
}
