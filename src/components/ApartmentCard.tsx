import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { formatPrice } from "../lib/utils"
import ImageCarousel from "./ImageCarousel"
import { Link } from "react-router-dom"

const ApartmentCard = ({ apartment: { id, title, price, images } }) => {
  return (
    <Card className="rounded-md h-full">
      <div className="h-40 overflow-hidden flex justify-center items-center">
        <ImageCarousel images={images}/>
      </div>
      <CardHeader>
        <CardTitle><Link to={id}>{title}</Link></CardTitle>
      </CardHeader>
      <CardContent>
        <p>{formatPrice(price)}</p>
      </CardContent>
    </Card>
  )
}

export default ApartmentCard