import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./providers/auth-provider";
import ReactQueryProvider from "./providers/query-provider";
import RouterProvider from "./providers/router-provider";

const App = () => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <RouterProvider />
        <Toaster />
      </ReactQueryProvider>
    </AuthProvider>
  )
}

export default App;