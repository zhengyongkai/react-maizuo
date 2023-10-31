interface addressComponentsImf {
    city: string;
}

export interface locationResultImf {
    addressComponents: addressComponentsImf;
}

export interface initialStateImf {
    locale: {
        cityId: number;
        name: string;
    };
    longitude: number;
    latitude: number;
    locationList: Array<any>;
}

export interface cityStateImf {
    location: initialStateImf;
}
