export default interface priceInf {
  market: number;
  premium: number;
  sale: number;
}

export interface sectionPriceInf {
  fee: number;
  marketPrice: number;
  price: number;
  sectionId: string;
}

export type sectionPricesInf = Array<sectionPriceInf>;
