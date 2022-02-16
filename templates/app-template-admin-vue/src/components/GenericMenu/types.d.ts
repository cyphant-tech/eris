export type Item = {
  path?: string;
  name: string;
  icon?: string;
  subItems?: Item[];
};

export type Menu = Item[];
