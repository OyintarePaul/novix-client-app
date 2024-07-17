import {useCollection} from "../hooks/firebase"
const Learn = () => {
  const {data: materials, isLoading, isError} = useCollection("course_materials")
  if (isLoading) return <p>Loading... Please wait</p>
  if (isError) return <p>Something went wrong.</p>
  return (
    <div>{materials.map((item) => (<p>{item.title}</p>))}</div>
  )
}

export default Learn