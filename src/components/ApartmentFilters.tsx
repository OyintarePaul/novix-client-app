import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const ApartmentFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelectChange = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  return (
    <div className="flex gap-4 my-6">
      <Select
        value={searchParams.get("price") || ""}
        onValueChange={(value: string) => handleSelectChange("price", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-60000">Less than 60,000</SelectItem>
          <SelectItem value="60000-100000">60,000 - 100,000</SelectItem>
          <SelectItem value="100000-150000">100,000 - 150,000</SelectItem>
          <SelectItem value="150000-200000">150,000 - 200,000</SelectItem>
          <SelectItem value="200000-250000">200,000 - 250,000</SelectItem>
          <SelectItem value="250000-500000">More than 250,000</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={searchParams.get("type") || ""}
        onValueChange={(value: string) => handleSelectChange("type", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single-room">Single Room</SelectItem>
          <SelectItem value="self-contain">Self-contain</SelectItem>
          <SelectItem value="one-bedroom">One-bedroom flat</SelectItem>
          <SelectItem value="two-bedroom">Two-bedroom flat</SelectItem>
          <SelectItem value="three-bedroom">Three bedroom flat</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={searchParams.get("has_water") || ""}
        onValueChange={(value: string) =>
          handleSelectChange("has_water", value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Water" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">With water</SelectItem>
          <SelectItem value="false">Without water</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={searchParams.get("has_light") || ""}
        onValueChange={(value: string) =>
          handleSelectChange("has_light", value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Light" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">With light</SelectItem>
          <SelectItem value="false">Without light</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => setSearchParams("")}>Reset</Button>
    </div>
  );
};

export default ApartmentFilters;
