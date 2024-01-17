import { preOrderEntity } from "./order";

export type messageInf = textInf | selectedInf | orderInf;

export type selectItemsInf = {
  title: string;
  url: string;
  id: string;
};

export type commonInf = {
  fromId: number;
  from: string;
  fromMy?: boolean;
  id: string | null;
  title: string;
  date: string;
};

export type orderInf = {
  type: "order";
  data: preOrderEntity;
} & commonInf;

export type textInf = {
  type: "text";
  data: [];
} & commonInf;

export type selectedInf = {
  type: "selected";
  data: selectListInf;
} & commonInf;

export type selectListInf = Array<selectItemsInf>;
