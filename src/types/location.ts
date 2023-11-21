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

export interface tudeImf {
  longitude: number;
  latitude: number;
}

export interface initialStateImf {
  locale: localeImf;
  tude: tudeImf;
  locationList: Array<any>;
}

export interface localeState {
  location: initialStateImf;
}

export interface cityStateImf {
  location: initialStateImf;
}
export interface tudeStateImf {
  location: {
    tude: tudeImf;
  };
}

export interface districtImf {
  districtId: number;
  name: string;
}
