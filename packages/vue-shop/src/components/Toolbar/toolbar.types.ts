export type Filter = {
  id: string | number,
  icon: string,
  value: string
};

export interface IDataToolbar {
  selected: string | number,
  filters: Array<Filter>
}
