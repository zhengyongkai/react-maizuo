interface addressComponentsInf {
  city: string;
}

export interface locationResultInf {
  addressComponents: addressComponentsInf;
}

export interface localeInf {
  cityId: number;
  name: string;
}

export interface tudeInf {
  longitude: number;
  latitude: number;
}

export interface initialStateInf {
  locale: localeInf;
  tude: tudeInf;
  locationList: Array<any>;
}

export interface localeState {
  location: initialStateInf;
}

export interface cityStateInf {
  location: initialStateInf;
}
export interface tudeStateInf {
  location: {
    tude: tudeInf;
  };
}

export interface districtInf {
  districtId: number;
  name: string;
}

export interface district {
  districtId: number;
  districtName: string;
}

export interface tude {
  latitude: number;
  longitude: number;
}
