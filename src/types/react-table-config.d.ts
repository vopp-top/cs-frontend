import {
  UsePaginationOptions,
  UseSortByOptions,
  UseGlobalFiltersOptions,
} from "react-table";

declare module "react-table" {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UsePaginationOptions<D>,
      UseSortByOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGlobalFiltersInstanceProps<D>,
      UsePaginationOptions<D>,
      UsePaginationInstanceProps<D> {}
}
