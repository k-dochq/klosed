export interface Tour {
  id: number;
  duration: string;
  title: string;
  tags: string[];
  image: string;
}

export interface TourPackage {
  id: number;
  duration: string;
  title: string;
  tags: string[];
}

export interface TourData {
  title: string;
  packages: TourPackage[];
}
