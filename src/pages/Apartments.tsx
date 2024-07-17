import { useSearchParams } from "react-router-dom"
import ApartmentFilters from "../components/ApartmentFilters"
import ApartmentsList from "../components/ApartmentsList"
import Container from "../components/Container"
import { useCollection } from "../hooks/firebase"
const Apartments = () => {
  const [searchParams] = useSearchParams();
  const { data: apartments, isLoading, isError} = useCollection("apartments", searchParams)
  let mainContent;
  if (isLoading) mainContent = <p>Loading, please wait...</p>
  if (isError) mainContent = <p>Something went wrong. Try again</p>
  if (!isLoading && apartments?.length > 0) mainContent = <ApartmentsList apartments={apartments}/>
  if (!isLoading && apartments?.length == 0) mainContent = <p>No apartments match your query</p>

  return (
    <Container>
      <h1 className="text-3xl font-bold ">Let's find you comfort</h1>
      <h2 className="text-lg text-center font-bold">Best in class</h2>
      <ApartmentFilters />
      {mainContent}
    </Container>
  )
}

export default Apartments