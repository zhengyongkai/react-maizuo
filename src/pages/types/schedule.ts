export interface scheduleImf {
  advanceStopMins: number;
  endAt: number;
  filmLanguage: string;
  hallName: string;
  imagery: string;
  isOnsell: boolean;
  marketPrice: number;
  maxSalePrice: number;
  minSalePrice: number;
  salePrice: number;
  scheduleId: number;
  showAt: number;
}

export interface scheduleResponseImf {
  schedules: Array<scheduleImf>;
}
