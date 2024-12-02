export type HTableProps = {
  categoryGroupStyle?: {
    [key: string]: string | number;
  };
  headerStyle?: {
    [key: string]: string | number;
  };
  rowStyle?: {
    [key: string]: string | number;
  };
  columnConfig: {
    name: string;
    colSpan?: number;
    colOrder: number;
    alignment?: "left" | "center" | "right";
    contentAlignment?: "left" | "center" | "right";
  }[];
};

export type HierarchyNode = {
  id?: string;
  left: string;
  right: string;
  children?: {
    [categoryId: string]: HierarchyNode;
  };
};

export type RowData = {
  rowId: string;
  categoryId: string;
  columnData: {
    [columnName: string]: string;
  };
};

export type HTableData = {
  hierarchy: {
    [categoryName: string]: HierarchyNode;
  };
  data: RowData[];
};

export type HTableConfig = {
  props: HTableProps;
  data: HTableData;
};
