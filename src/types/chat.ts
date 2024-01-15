export type messageInf = {
  type: "selected" | "text";
  title: string;
  date: "";
  fromId: number;
  from: string;
  data?: selectListInf;
  fromMy?: boolean;
};

export type selectItemsInf = {
  title: string;
  url: string;
};

export type selectedInf = {
  type: "selected" | "text";
  title: string;
  date: "";
  fromId: number;
  from: string;
  data: selectListInf;
  fromMy?: boolean;
};

export type selectListInf = Array<selectItemsInf>;
