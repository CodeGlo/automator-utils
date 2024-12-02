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
  columnsConfig: {
    name: string;
    colSpan?: number;
    colOrder: number;
    alignment?: "left" | "center" | "right";
    contentAlignment?: "left" | "center" | "right";
  }[];
};

export type HierarchyNode = {
  id: string;
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

export class HierarchyNodeBuilder {
  private _id: string;
  private _left: string;
  private _right: string;
  private _children: Map<string, HierarchyNodeBuilder> = new Map();

  constructor(id: string, left: string, right: string = "") {
    this._id = id;
    this._left = left;
    this._right = right;
  }

  getId(): string {
    return this._id;
  }

  setLeft(left: string): HierarchyNodeBuilder {
    this._left = left;
    return this;
  }

  getLeft(): string {
    return this._left;
  }

  setRight(right: string): HierarchyNodeBuilder {
    this._right = right;
    return this;
  }

  getRight(): string {
    return this._right;
  }

  getChildren(): Map<string, HierarchyNodeBuilder> {
    return this._children;
  }

  addChild(child: HierarchyNodeBuilder): HierarchyNodeBuilder {
    this._children.set(child._id, child);
    return this;
  }

  createChild(
    id: string,
    left: string,
    right: string = ""
  ): HierarchyNodeBuilder {
    const child = new HierarchyNodeBuilder(id, left, right);
    this._children.set(id, child);
    return child;
  }

  hasId(id: string): boolean {
    if (this._id === id) {
      return true;
    }

    for (const child of this._children.values()) {
      if (child.hasId(id)) {
        return true;
      }
    }

    return false;
  }

  build(): HierarchyNode {
    const children: { [key: string]: HierarchyNode } = {};

    // First build all children
    for (const [id, builder] of this._children) {
      children[id] = builder.build();
    }

    // Then build self
    return {
      id: this._id,
      left: this._left,
      right: this._right,
      ...(this._children.size > 0 && { children }),
    };
  }
}

class CategoryGroupStyleBuilder {
  private _styles: Map<string, string> = new Map();

  setStyle(key: string, value: string): CategoryGroupStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyle(key: string): string | undefined {
    return this._styles.get(key);
  }

  addStyle(key: string, value: string): CategoryGroupStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }
  build(): { [key: string]: string } {
    return Object.fromEntries(this._styles);
  }
}

class HeaderStyleBuilder {
  private _styles: Map<string, string> = new Map();

  setStyle(key: string, value: string): HeaderStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyle(key: string): string | undefined {
    return this._styles.get(key);
  }

  addStyle(key: string, value: string): HeaderStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }

  build(): { [key: string]: string } {
    return Object.fromEntries(this._styles);
  }
}

class RowStyleBuilder {
  private _styles: Map<string, string> = new Map();

  setStyle(key: string, value: string): RowStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyle(key: string): string | undefined {
    return this._styles.get(key);
  }

  addStyle(key: string, value: string): RowStyleBuilder {
    this._styles.set(key, value);
    return this;
  }

  getStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }

  build(): { [key: string]: string } {
    return Object.fromEntries(this._styles);
  }
}

class ColumnBuilder {
  private _name: string;
  private _colSpan?: number;
  private _colOrder: number;
  private _alignment: "left" | "center" | "right" = "center";
  private _contentAlignment: "left" | "center" | "right" = "center";

  constructor(name: string, colOrder: number) {
    this._name = name;
    this._colOrder = colOrder;
  }

  setName(name: string): ColumnBuilder {
    this._name = name;
    return this;
  }

  getName(): string {
    return this._name;
  }

  setColSpan(span: number): ColumnBuilder {
    this._colSpan = span;
    return this;
  }

  getColSpan(): number | undefined {
    return this._colSpan;
  }

  setColOrder(order: number): ColumnBuilder {
    this._colOrder = order;
    return this;
  }

  getColOrder(): number {
    return this._colOrder;
  }

  setAlignment(alignment: "left" | "center" | "right"): ColumnBuilder {
    this._alignment = alignment;
    return this;
  }

  getAlignment(): "left" | "center" | "right" {
    return this._alignment;
  }

  setContentAlignment(alignment: "left" | "center" | "right"): ColumnBuilder {
    this._contentAlignment = alignment;
    return this;
  }

  getContentAlignment(): "left" | "center" | "right" {
    return this._contentAlignment;
  }

  build(): {
    name: string;
    colSpan?: number;
    colOrder: number;
    alignment?: "left" | "center" | "right";
    contentAlignment?: "left" | "center" | "right";
  } {
    return {
      name: this._name,
      colSpan: this._colSpan,
      colOrder: this._colOrder,
      alignment: this._alignment,
      contentAlignment: this._contentAlignment,
    };
  }
}

class ColumnsConfigBuilder {
  private _columns: ColumnBuilder[] = [];

  addColumn(column: ColumnBuilder): ColumnsConfigBuilder {
    this._columns.push(column);
    return this;
  }

  removeColumn(columnName: string): ColumnsConfigBuilder {
    this._columns = this._columns.filter((col) => col.getName() !== columnName);
    return this;
  }

  getColumn(columnName: string): ColumnBuilder | undefined {
    return this._columns.find((col) => col.getName() === columnName);
  }

  sortByOrder(): ColumnsConfigBuilder {
    this._columns.sort((a, b) => a.getColOrder() - b.getColOrder());
    return this;
  }

  getColumns(): ColumnBuilder[] {
    return [...this._columns];
  }

  build(): {
    name: string;
    colSpan?: number;
    colOrder: number;
    alignment?: "left" | "center" | "right";
    contentAlignment?: "left" | "center" | "right";
  }[] {
    return this._columns.map((column) => column.build());
  }
}

export class HTableConfigBuilder {
  private _categoryGroupStyle = new CategoryGroupStyleBuilder();
  private _headerStyle = new HeaderStyleBuilder();
  private _rowStyle = new RowStyleBuilder();
  private _columnsConfig = new ColumnsConfigBuilder();
  private _hierarchy: Map<string, HierarchyNodeBuilder> = new Map();
  private _data: RowData[] = [];
  private _rowIdCounter = 0;

  getCategoryGroupStyle(): CategoryGroupStyleBuilder {
    return this._categoryGroupStyle;
  }

  getHeaderStyle(): HeaderStyleBuilder {
    return this._headerStyle;
  }

  getRowStyle(): RowStyleBuilder {
    return this._rowStyle;
  }

  getColumnsConfig(): ColumnsConfigBuilder {
    return this._columnsConfig;
  }

  createHierarchyNode(
    id: string,
    left: string,
    right: string = ""
  ): HierarchyNodeBuilder {
    const node = new HierarchyNodeBuilder(id, left, right);
    this._hierarchy.set(id, node);
    return node;
  }

  addHierarchyNode(node: HierarchyNodeBuilder): HTableConfigBuilder {
    this._hierarchy.set(node.getId(), node);
    return this;
  }

  addRows(
    category: HierarchyNodeBuilder,
    idPrefix: string,
    rows: RowData["columnData"][]
  ): HTableConfigBuilder {
    const categoryId =
      typeof category === "string" ? category : category.getId();

    if (!this._hierarchy.has(categoryId)) {
      console.error(`Category ${categoryId} does not exist in hierarchy`);
      throw new Error(`Category ${categoryId} does not exist in hierarchy`);
    }

    rows.forEach((columnData, index) => {
      this._data.push({
        rowId: `${idPrefix}_${this._rowIdCounter++}`,
        categoryId,
        columnData,
      });
    });

    return this;
  }

  build(): HTableConfig {
    const hierarchy: { [categoryName: string]: HierarchyNode } = {};

    for (const [id, builder] of this._hierarchy) {
      hierarchy[id] = builder.build();
    }

    return {
      props: {
        categoryGroupStyle: this._categoryGroupStyle.build(),
        headerStyle: this._headerStyle.build(),
        rowStyle: this._rowStyle.build(),
        columnsConfig: this._columnsConfig.build(),
      },
      data: {
        hierarchy,
        data: this._data,
      },
    };
  }
}

export class OdinHTableConfigBuilder extends HTableConfigBuilder {
  constructor() {
    super();

    // Set header style defaults
    this.getHeaderStyle()
      .addStyle("padding", "8px 0")
      .addStyle("background-color", "rgb(52, 40, 78)")
      .addStyle("color", "white");

    // Set category group style defaults
    this.getCategoryGroupStyle()
      .addStyle("padding", "8px 0")
      .addStyle("margin-bottom", "4px")
      .addStyle("background-color", "rgb(52, 40, 78)")
      .addStyle("color", "white");

    // Set row style defaults
    this.getRowStyle()
      .addStyle("padding", "4px 0")
      .addStyle("fontSize", "13px")
      .addStyle("borderBottom", "none")
      .addStyle("lineHeight", "1.3");
  }
}