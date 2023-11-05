interface addressComponentsImf {
  city: string;
}

export interface locationResultImf {
  addressComponents: addressComponentsImf;
}

export interface localeImf {
  cityId: number;
  name: string;
}

export interface initialStateImf {
  locale: localeImf;
  longitude: number;
  latitude: number;
  locationList: Array<any>;
}

export interface cityStateImf {
  location: initialStateImf;
}
