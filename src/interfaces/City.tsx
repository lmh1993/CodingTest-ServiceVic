export default interface City {
    id: number;
    selected?: boolean;
    name?: string;
    temperature?: number;
    weatherCondition?: string;
    weatherIcon?: string;
    humidity?: number;
    windSpeed?: number;
}