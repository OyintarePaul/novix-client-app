"use client";

import CreateApartmentForm from "../components/CreateApartmentForm";
const CreateApartment = () => {
  return (
    <div className="m-4">
      <h2 className="font-bold text-xl text-center">Create a new apartment</h2>
      <CreateApartmentForm />
    </div>
  );
};

export default CreateApartment;
