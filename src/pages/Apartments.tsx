import { useSearchParams } from "react-router-dom";
import ApartmentFilters from "../components/ApartmentFilters";
import ApartmentsList from "../components/ApartmentsList";
import Container from "../components/Container";
import { useCollection } from "../hooks/firebase";
import { ApartmentsSkeleton } from "../components/Skeleton";
import { Button } from "../components/ui/button";
import { IApartment } from "../types";
import { useEffect } from "react";
const Apartments = () => {
  const [searchParams] = useSearchParams();
  const {
    data: apartments,
    isLoading,
    isError,
    error,
  } = useCollection<IApartment>("apartments", searchParams);
  useEffect(() => {
    if (error) console.log(error.message);
  });
  let mainContent;
  if (isLoading) mainContent = <ApartmentsSkeleton />;
  if (isError) mainContent = <p>Something went wrong. Try again</p>;
  if (!isLoading && apartments && apartments?.length > 0)
    mainContent = <ApartmentsList apartments={apartments} />;
  if (!isLoading && apartments && apartments?.length == 0)
    mainContent = <p>No apartments match your query</p>;

  return (
    <>
      <Hero />
      <Container>
        <h2 className="text-lg text-center font-bold my-4">
          Browse Apartments
        </h2>
        <ApartmentFilters />
        {mainContent}
      </Container>
    </>
  );
};

export default Apartments;

const Hero = () => {
  return (
    <div className="h-[400px] bg-cover bg-no-repeat bg-top bg-[url('/images/home-bg.jpg')]">
      <Container>
        <h1 className="text-5xl text-white font-bold pt-28">
          Let's find you the
          <br />
          comfort you deserve
        </h1>
        <p className="my-4 text-muted">
          Finding a lodge shouldn't be a headache. Explore & book in seconds...
        </p>
        <Button>Explore recent apartments</Button>
      </Container>
    </div>
  );
};
