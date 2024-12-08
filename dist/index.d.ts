type HTableProps = {
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
type HierarchyNode = {
    id: string;
    left: string;
    right: string;
    children?: {
        [categoryId: string]: HierarchyNode;
    };
};
type RowData = {
    rowId: string;
    categoryId: string;
    columnData: {
        [columnName: string]: string;
    };
};
type HTableData = {
    hierarchy: {
        [categoryName: string]: HierarchyNode;
    };
    data: RowData[];
};
type HTableConfig = {
    props: HTableProps;
    data: HTableData;
};
declare class HierarchyNodeBuilder {
    private _id;
    private _left;
    private _right;
    private _children;
    constructor(id: string, left: string, right?: string);
    getId(): string;
    setLeft(left: string): HierarchyNodeBuilder;
    getLeft(): string;
    setRight(right: string): HierarchyNodeBuilder;
    getRight(): string;
    getChildren(): Map<string, HierarchyNodeBuilder>;
    addChild(child: HierarchyNodeBuilder): HierarchyNodeBuilder;
    createChild(id: string, left: string, right?: string): HierarchyNodeBuilder;
    hasId(id: string): boolean;
    build(): HierarchyNode;
}
declare class CategoryGroupStyleBuilder {
    private _styles;
    setStyle(key: string, value: string): CategoryGroupStyleBuilder;
    getStyle(key: string): string | undefined;
    addStyle(key: string, value: string): CategoryGroupStyleBuilder;
    getStyles(): {
        [key: string]: string;
    };
    build(): {
        [key: string]: string;
    };
}
declare class HeaderStyleBuilder {
    private _styles;
    setStyle(key: string, value: string): HeaderStyleBuilder;
    getStyle(key: string): string | undefined;
    addStyle(key: string, value: string): HeaderStyleBuilder;
    getStyles(): {
        [key: string]: string;
    };
    build(): {
        [key: string]: string;
    };
}
declare class RowStyleBuilder {
    private _styles;
    setStyle(key: string, value: string): RowStyleBuilder;
    getStyle(key: string): string | undefined;
    addStyle(key: string, value: string): RowStyleBuilder;
    getStyles(): {
        [key: string]: string;
    };
    build(): {
        [key: string]: string;
    };
}
declare class ColumnBuilder {
    private _name;
    private _colSpan?;
    private _colOrder;
    private _alignment;
    private _contentAlignment;
    constructor(name: string, colOrder: number);
    setName(name: string): ColumnBuilder;
    getName(): string;
    setColSpan(span: number): ColumnBuilder;
    getColSpan(): number | undefined;
    setColOrder(order: number): ColumnBuilder;
    getColOrder(): number;
    setAlignment(alignment: "left" | "center" | "right"): ColumnBuilder;
    getAlignment(): "left" | "center" | "right";
    setContentAlignment(alignment: "left" | "center" | "right"): ColumnBuilder;
    getContentAlignment(): "left" | "center" | "right";
    build(): {
        name: string;
        colSpan?: number;
        colOrder: number;
        alignment?: "left" | "center" | "right";
        contentAlignment?: "left" | "center" | "right";
    };
}
declare class ColumnsConfigBuilder {
    private _columns;
    addColumn(column: ColumnBuilder): ColumnsConfigBuilder;
    removeColumn(columnName: string): ColumnsConfigBuilder;
    getColumn(columnName: string): ColumnBuilder | undefined;
    sortByOrder(): ColumnsConfigBuilder;
    getColumns(): ColumnBuilder[];
    build(): {
        name: string;
        colSpan?: number;
        colOrder: number;
        alignment?: "left" | "center" | "right";
        contentAlignment?: "left" | "center" | "right";
    }[];
}
declare class HTableConfigBuilder {
    private _categoryGroupStyle;
    private _headerStyle;
    private _rowStyle;
    private _columnsConfig;
    private _hierarchy;
    private _data;
    private _rowIdCounter;
    getCategoryGroupStyle(): CategoryGroupStyleBuilder;
    getHeaderStyle(): HeaderStyleBuilder;
    getRowStyle(): RowStyleBuilder;
    getColumnsConfig(): ColumnsConfigBuilder;
    createHierarchyNode(id: string, left: string, right?: string): HierarchyNodeBuilder;
    addHierarchyNode(node: HierarchyNodeBuilder): HTableConfigBuilder;
    addRows(category: HierarchyNodeBuilder, rows: RowData["columnData"][]): HTableConfigBuilder;
    build(): HTableConfig;
    toHTML(): string;
}
declare class OdinHTableConfigBuilder extends HTableConfigBuilder {
    constructor();
}

export { CategoryGroupStyleBuilder, ColumnBuilder, ColumnsConfigBuilder, type HTableConfig, HTableConfigBuilder, type HTableData, type HTableProps, HeaderStyleBuilder, type HierarchyNode, HierarchyNodeBuilder, OdinHTableConfigBuilder, type RowData, RowStyleBuilder };
