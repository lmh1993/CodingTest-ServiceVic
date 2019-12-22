import City from "./City";

export default interface SearchCity {
    error: boolean;
    value: string;
    suggestions: Array<any> | void;
    city: City;
}

