import { Skeleton } from "./ui/skeleton";

export const ApartmentsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      <ApartmentSkeleton />
      <ApartmentSkeleton />
      <ApartmentSkeleton />
      <ApartmentSkeleton />
      <ApartmentSkeleton />
      <ApartmentSkeleton />
    </div>
  );
};

const ApartmentSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-8 h-4" />
        <Skeleton className="w-8 h-4" />
        <Skeleton className="w-8 h-4" />
      </div>
    </div>
  );
};
