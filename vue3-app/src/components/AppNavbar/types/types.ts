export interface MenuDate {
  title: string;
  index: string;
  icon: string;
  inpublic?: boolean;
  children?: MenuChildrenDate[];
}
export interface MenuChildrenDate {
  title: string;
  index: string;
  icon: string;
}
