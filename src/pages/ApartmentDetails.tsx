import { useParams } from "react-router-dom";
import { useDocumentData } from "../hooks/firebase";
import { formatPrice } from "../lib/utils";
import Container from "../components/Container";
import { Bed, Heart, House, Ruler, ShieldPlus } from "lucide-react";
import { Button } from "../components/ui/button";

const features = [
  {
    key: "room_size",
    icon: <House color="white" />,
    label: "Room Size",
  },
  {
    key: "number_of_bedrooms",
    icon: <Bed color="white" />,
    label: "Number of Bedrooms",
  },
  {
    key: "distance_to_campus",
    icon: <Ruler color="white" />,
    label: "Distance from campus",
  },
  {
    key: "security_level",
    icon: <ShieldPlus color="white" />,
    label: "Security Level",
  },
];

const ApartmentDetails = () => {
  const { apartmentID } = useParams();
  const {
    data: apartment,
    isLoading,
    isError,
  } = useDocumentData("apartments", apartmentID!);
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Error... Something went wrong</p>;
  return (
    <Container>
      <div className="md:flex gap-4 mt-6">
        <div id="col-1" className="flex flex-col gap-6">
          <div>
            <img
              src={apartment?.images[0]}
              className="object-center object-cover w-full h-[350px] rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold">{apartment?.title}</p>
              <p className="text-gray-600">{apartment?.location}</p>
            </div>
            <p className="text-xl font-bold">
              {formatPrice(apartment.price)}
              <span className="text-sm text-gray-600">/year</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
            {features.map((feature) => (
              <div className="flex gap-4 items-center" key={feature.key}>
                <div className="w-12 h-12 items-center flex justify-center bg-red-400 rounded-full">
                  {feature.icon}
                </div>
                <p className="text-md font-bold">
                  {interpretFeature(apartment, feature)}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-gray-600">{apartment.description}</p>
          </div>

          <div className="flex gap-4">
            <Button>Contact Owner</Button>
            <Button variant="outline">
              <Heart className="mr-2 w-4" /> Add to favourites
            </Button>
          </div>
        </div>
        <div className="w-1/4">
          Someother content will go here later. I don tire abeg
        </div>
      </div>
    </Container>
  );
};

export default ApartmentDetails;

function interpretFeature(apartment, feature) {
  if (feature.key == "number_of_bedrooms") {
    return apartment.number_of_bedrooms + " Bedrooms";
  }
  if (feature.key == "room_size") return apartment.room_size;
  if (feature.key == "security_level") {
    const securityLevel = apartment.security_level;
    const levelMap = new Map([
      [1, "Not secure"],
      [2, "Fairly secure"],
      [3, "Quite secure"],
      [4, "Very secure"],
      [5, "Extremely secure"],
    ]);
    return levelMap.get(securityLevel);
  }
  if (feature.key == "distance_to_campus") {
    return apartment.distance_to_campus + "KM approx";
  }
}
