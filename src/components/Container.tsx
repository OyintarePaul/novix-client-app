import { PropsWithChildren } from "react"

const Container = ({children}: PropsWithChildren) => {
  return (
    <div className="max-w-4xl px-4 mx-auto">{children}</div>
  )
}

export default Container