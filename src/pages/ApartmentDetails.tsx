import { useParams } from "react-router-dom"
import { useDocumentData } from "../hooks/firebase";
import {formatPrice} from "../lib/utils"
import Container from "../components/Container";

const ApartmentDetails = () => {
  const { apartmentID } = useParams();
  const { data: apartment, isLoading, isError } = useDocumentData("apartments", apartmentID!)
  if (isLoading) return <p>Loading, please  wait...</p>
  if (isError) return <p>Error... Something went wrong</p>
  return (
    <Container>
      <h2 className="text-2xl font-bold">{apartment.title}</h2>
      <img src={apartment.images[0]}/>
      <p className="font-bold text-lg">{formatPrice(apartment.price)}</p>
      <p>{apartment.description}</p>
    </Container>
  )
}

export default ApartmentDetails