import { useCollection } from "../hooks/firebase";
import { IApartment } from "../types";
import ApartmentCard from "./ApartmentCard";

const RelatedApartments = ({ apartment }: { apartment: IApartment }) => {
  const searchParams = new URLSearchParams({
    type: apartment.type,
  });
  const {
    data: apartments,
    isLoading,
    isError,
  } = useCollection<IApartment>("apartments", searchParams);
  if (isLoading) return <div>Loading Related Apartments, please wait...</div>;
  if (isError)
    return <div>Something went wrong... Please try to refresh the page</div>;
  if (apartments)
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Check out similar apartments</h2>
        {apartments
          .filter((item) => apartment.id != item.id)
          .map((apartment) => (
            <ApartmentCard apartment={apartment} horizontal />
          ))}
      </div>
    );
};
export default RelatedApartments;
