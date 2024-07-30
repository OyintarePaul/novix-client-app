import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatPrice } from "../lib/utils";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Bed, Lightbulb, Star, Waves } from "lucide-react";
import { IApartment } from "../types";
import FirebaseImage from "./FirebaseImage";

const ApartmentCard = ({
  apartment: {
    title,
    location,
    price,
    media,
    id,
    rating,
    has_light,
    has_water,
    type,
  },
}: {
  apartment: IApartment;
  horizontal: boolean;
}) => {
  return (
    <Card className="rounded-md h-full">
      <div className="h-52 overflow-hidden flex justify-center items-center">
        <FirebaseImage
          imageRef={media[0]}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="text-lg flex justify-between items-center">
          <Link to={`/apartments/${id}`}>{title}</Link>
          <Badge>
            <Star className="mr-2 w-4 h-4" /> {rating}
          </Badge>
        </CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">
          {formatPrice(price)}
          <span className="text-sm text-gray-400">/year</span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Badge variant="secondary">
              <Lightbulb className="mr-2 w-4 h-4" />{" "}
              {has_light == "true" ? "Yes" : "No"}
            </Badge>
            <Badge variant="secondary">
              <Waves className="mr-2 w-4 h-4" />{" "}
              {has_water == "true" ? "Yes" : "No"}
            </Badge>
            <Badge variant="secondary">
              <Bed className="mr-2 w-4 h-4" />{" "}
              <span className="capitalize">{type}</span>
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApartmentCard;
