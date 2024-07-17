import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { FormEvent } from "react"
import { useLogin } from "../hooks/firebase/"
import { Loader2 } from "lucide-react"
import { useAuth } from "../providers/auth-provider"
import { Link, Navigate } from "react-router-dom"
import { useToast } from "./ui/use-toast"

export const Login = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const { mutate: login, isPending } = useLogin();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    login({ email, password }, {
      onSuccess: () => {
        toast({
          title: "You have successfully logged in. Great Job"
        })
      }
    })
  }


  if (user != null) return <Navigate to="/" />

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-center mb-4">Login</h3>
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
          <Button>{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}</Button>
          <Link to="/auth/sign-in" className="text-center">Or sign in instead</Link>
        </div>
      </form>
    </div>
  )
}
