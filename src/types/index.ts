export interface IApartment {
  id: string;
  title: string;
  price: number;
  features: string[];
  reviews: string[];
  rating: FivePointScale;
  type: HouseType;
  number_of_bedrooms: number;
  agent_fee: number;
  lodge_name: string;
  has_light: string;
  has_water: string;
  description: string;
  location: string;
  lease_term: number;
  landlord_name: string;
  landlord_phone_number: string;
  smoking_policy: string;
  subletting_policy: string;
  noise_level: string;
  images: string[];
  amenities: string[];
  distance_to_campus: number;
  security_level: FivePointScale;
  room_size: number;
  created_at: string;
  media: string[];
}

type FivePointScale = 1 | 2 | 3 | 4 | 5;
type HouseType =
  | "single-room"
  | "one-bedroom"
  | "two-bedroom"
  | "three-bedroom";
