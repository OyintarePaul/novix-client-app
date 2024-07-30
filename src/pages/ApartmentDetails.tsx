import { useParams } from "react-router-dom";
import { useDocumentData } from "../hooks/firebase";
import { formatPrice } from "../lib/utils";
import Container from "../components/Container";
import { Bed, Heart, House, Ruler, ShieldPlus } from "lucide-react";
import { Button } from "../components/ui/button";
import { IApartment } from "../types";
import RelatedApartments from "../components/RelatedApartments";
import FirebaseImage from "../components/FirebaseImage";

const features = [
  {
    key: "room_size",
    icon: <House color="white" />,
    label: "Room Size",
  },
  {
    key: "number_of_rooms",
    icon: <Bed color="white" />,
    label: "Number of Bedrooms",
  },
  {
    key: "distance_to_campus",
    icon: <Ruler color="white" />,
    label: "Distance to campus",
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
  } = useDocumentData<IApartment>("apartments", apartmentID!);
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Error... Something went wrong</p>;
  if (apartment)
    return (
      <Container>
        <div className="flex flex-col gap-6">
          <div className="h-[350px] flex gap-2">
            <div className="w-3/4">
              <FirebaseImage
                imageRef={apartment.media[0]}
                className="object-center object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/4">
              <div className="h-1/2 w-full">
                <FirebaseImage
                  imageRef={apartment.media[1] || apartment.media[0]}
                  className="object-center object-cover w-full h-full"
                />
              </div>
              <div className="h-1/2 w-full">
                <FirebaseImage
                  imageRef={apartment.media[2] || apartment.media[0]}
                  className="object-center object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold">{apartment.title}</p>
              <p className="text-gray-600">{apartment.location}</p>
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
            <p className="text-gray-600">{apartment?.description}</p>
          </div>

          <div className="flex gap-4">
            <Button>Contact Owner</Button>
            <Button variant="outline">
              <Heart className="mr-2 w-4" /> Add to favourites
            </Button>
          </div>
        </div>
        <div>
          <RelatedApartments apartment={apartment} />
        </div>
      </Container>
    );
};

export default ApartmentDetails;

function interpretFeature(
  apartment: IApartment,
  feature: {
    key: string;
    icon: JSX.Element;
    label: string;
  }
) {
  if (feature.key == "number_of_rooms") {
    return apartment.number_of_rooms + " Bedrooms";
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
