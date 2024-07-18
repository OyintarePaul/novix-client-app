import ApartmentCard from "./ApartmentCard";

const ApartmentsList = ({ apartments }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {apartments.map((apartment, index) => (
        <ApartmentCard apartment={apartment} key={index} />
      ))}
    </div>
  );
};

export default ApartmentsList;
