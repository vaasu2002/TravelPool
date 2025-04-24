export interface CarDetails {
    carName: string;
    pricePerPerson: number;
    seatsLeft: number;
}
  
export interface TaxiPool {
    id: string | number;
    name: string;
    gender: string;
    phone: string;
    startLocation: string;
    endLocation: string;
    midwayDrops: string[];
    date: string;
    timeRange: string;
    hasBooked: boolean;
    carDetails: CarDetails | null;
    phoneRequests: number;
}