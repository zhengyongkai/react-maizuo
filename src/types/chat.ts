export type messageInf = {
  type: 'selected' | 'text';
  title: string;
  date: string;
  fromId: number;
  from: string;
  data?: selectListInf;
  fromMy?: boolean;
  id: string | null;
};

export type selectItemsInf = {
  title: string;
  url: string;
  id: string;
};

export type selectedInf = {
  type: 'selected' | 'text';
  title: string;
  date: string;
  fromId: number;
  from: string;
  data?: selectListInf;
  fromMy?: boolean;
  id: string | null;
};

export type selectListInf = Array<selectItemsInf>;
