enum Animal {
  NONE = "NONE",
  CAT = "CAT",
  DOG = "DOG",
  ALL = "ALL",
}

type Rent = {
  name: string;
  local: string;
  address: string;
  price: number;
  bad_count: number;
  toilet_count: number;
  acreage: string;
  home_detail: string;
  animal_welcome: Animal;
  in_unity_amenity: string[];
  community_amenity: string[];
  walk: number;
  bicycle: number;
};

type Sale = {
  name: string;
  address: string;
  price: string;
  bad_count: number;
  toilet_count: number;
  acreage: string;
  home_detail: string;
  home_fact: {
    time_on: string;
    prototype: string;
    year_built: number;
    local: string;
    lot_size: string;
  };
  price_insight: {
    list_price: string;
    m_price: string;
    estimate: string;
    price_per: string;
    agent_fee: string;
  };
};
