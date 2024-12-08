"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CategoryGroupStyleBuilder: () => CategoryGroupStyleBuilder,
  ColumnBuilder: () => ColumnBuilder,
  ColumnsConfigBuilder: () => ColumnsConfigBuilder,
  HTableConfigBuilder: () => HTableConfigBuilder,
  HeaderStyleBuilder: () => HeaderStyleBuilder,
  HierarchyNodeBuilder: () => HierarchyNodeBuilder,
  OdinHTableConfigBuilder: () => OdinHTableConfigBuilder,
  RowStyleBuilder: () => RowStyleBuilder
});
module.exports = __toCommonJS(src_exports);

// src/reporting/HTable/HTableWriter.ts
var writeCategoryGroup = (categoryGroupStyle = {}, depth, left, right, columnConfig) => {
  var _a, _b;
  const styleString = Object.entries(categoryGroupStyle).map(([key, value]) => `${key}: ${value}`).join(";");
  const paddingLeft = Math.max(depth * 20, 8) + 8;
  const rightColumnWidth = columnConfig.length > 0 ? ((_b = (_a = columnConfig.sort((a, b) => a.colOrder - b.colOrder).slice(-1)[0]) == null ? void 0 : _a.colSpan) != null ? _b : 1) * 100 : 100;
  const finalStyle = `${styleString}; padding-left: ${paddingLeft}px; padding-bottom: 0; margin-bottom: 0; position: relative`;
  const headingTag = depth === 0 ? "h2" : "h3";
  return `
    <div style="${finalStyle}">
      <${headingTag} style="display: flex; margin: 0; justify-content: space-between; padding-right: ${rightColumnWidth / 2}px">
        <span>${left}</span>
        <span>${right}</span>
      </${headingTag}>
    </div>
  `.trim();
};
var writeRow = (rowStyle = {}, columnConfig, columnData, depth) => {
  const styleString = Object.entries(rowStyle).map(([key, value]) => `${key}: ${value}`).join(";");
  const indentWidth = Math.max(depth * 20, 8) + 8;
  const cells = [
    `<td style="width: ${indentWidth}px"></td>`,
    ...columnConfig.map((column) => {
      const content = columnData[column.name] || "";
      const contentAlignment = column.contentAlignment || "center";
      return `<td style="padding: 2px 8px; text-align: ${contentAlignment}">${content}</td>`;
    })
  ].join("");
  return `<tr style="${styleString}">${cells}</tr>`.trim();
};
var writeTable = (props, depth, categoryName, rowData) => {
  const indentWidth = Math.max(depth * 20, 8) + 8;
  const headerStyleString = Object.entries(props.headerStyle || {}).map(([key, value]) => `${key}: ${value}`).join(";");
  const categoryRows = rowData.filter((row) => row.categoryId === categoryName);
  const rows = categoryRows.map(
    (row) => writeRow(props.rowStyle, props.columnsConfig, row.columnData, depth)
  ).join("\n");
  return `
    <div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="${headerStyleString}">
            <th style="width: ${indentWidth}px; padding: 12px 8px;"></th>
            ${props.columnsConfig.sort((a, b) => a.colOrder - b.colOrder).map((col) => {
    const width = col.colSpan ? `width: ${col.colSpan * 100}px;` : "";
    const alignment = col.alignment || "center";
    return `<th style="padding: 12px 8px; text-align: ${alignment}; ${width}">${col.name}</th>`;
  }).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
};
var writeHTable = (config) => {
  const { props, data } = config;
  const { hierarchy, data: rowData } = data;
  const processCategory = (categoryName, category, depth, output = [], hierarchyPath = []) => {
    const currentPath = [
      ...hierarchyPath,
      {
        categoryName,
        left: category.left,
        right: category.right,
        depth
      }
    ];
    const hasRowData = rowData.some((row) => row.categoryId === categoryName);
    if (hasRowData) {
      for (const pathItem of currentPath) {
        output.push(
          writeCategoryGroup(
            props.categoryGroupStyle,
            pathItem.depth,
            pathItem.left,
            pathItem.right,
            props.columnsConfig
          )
        );
      }
      output.push(writeTable(props, depth, categoryName, rowData));
    }
    if (category.children) {
      const sortedChildren = Object.entries(category.children).sort(
        ([a], [b]) => a.localeCompare(b)
      );
      for (const [childId, childNode] of sortedChildren) {
        processCategory(childId, childNode, depth + 1, output, currentPath);
      }
    }
    return output;
  };
  const sortedRootCategories = Object.entries(hierarchy).sort(
    ([a], [b]) => a.localeCompare(b)
  );
  const reportParts = [];
  for (const [categoryName, category] of sortedRootCategories) {
    processCategory(categoryName, category, 0, reportParts);
  }
  return `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: white; max-width: 1200px; margin: 0 auto; padding: 20px;">
        ${reportParts.join("\n")}
      </div>
    `;
};

// src/reporting/HTable/index.ts
var HierarchyNodeBuilder = class _HierarchyNodeBuilder {
  constructor(id, left, right = "") {
    this._children = /* @__PURE__ */ new Map();
    this._id = id;
    this._left = left;
    this._right = right;
  }
  getId() {
    return this._id;
  }
  setLeft(left) {
    this._left = left;
    return this;
  }
  getLeft() {
    return this._left;
  }
  setRight(right) {
    this._right = right;
    return this;
  }
  getRight() {
    return this._right;
  }
  getChildren() {
    return this._children;
  }
  addChild(child) {
    this._children.set(child._id, child);
    return this;
  }
  createChild(id, left, right = "") {
    const child = new _HierarchyNodeBuilder(id, left, right);
    this._children.set(id, child);
    return child;
  }
  hasId(id) {
    console.log(this._id, id);
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
  build() {
    const children = {};
    for (const [id, builder] of this._children) {
      children[id] = builder.build();
    }
    return {
      id: this._id,
      left: this._left,
      right: this._right,
      ...this._children.size > 0 && { children }
    };
  }
};
var CategoryGroupStyleBuilder = class {
  constructor() {
    this._styles = /* @__PURE__ */ new Map();
  }
  setStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyle(key) {
    return this._styles.get(key);
  }
  addStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyles() {
    const styles = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }
  build() {
    return Object.fromEntries(this._styles);
  }
};
var HeaderStyleBuilder = class {
  constructor() {
    this._styles = /* @__PURE__ */ new Map();
  }
  setStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyle(key) {
    return this._styles.get(key);
  }
  addStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyles() {
    const styles = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }
  build() {
    return Object.fromEntries(this._styles);
  }
};
var RowStyleBuilder = class {
  constructor() {
    this._styles = /* @__PURE__ */ new Map();
  }
  setStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyle(key) {
    return this._styles.get(key);
  }
  addStyle(key, value) {
    this._styles.set(key, value);
    return this;
  }
  getStyles() {
    const styles = {};
    this._styles.forEach((value, key) => {
      styles[key] = value;
    });
    return styles;
  }
  build() {
    return Object.fromEntries(this._styles);
  }
};
var ColumnBuilder = class {
  constructor(name, colOrder) {
    this._alignment = "center";
    this._contentAlignment = "center";
    this._name = name;
    this._colOrder = colOrder;
  }
  setName(name) {
    this._name = name;
    return this;
  }
  getName() {
    return this._name;
  }
  setColSpan(span) {
    this._colSpan = span;
    return this;
  }
  getColSpan() {
    return this._colSpan;
  }
  setColOrder(order) {
    this._colOrder = order;
    return this;
  }
  getColOrder() {
    return this._colOrder;
  }
  setAlignment(alignment) {
    this._alignment = alignment;
    return this;
  }
  getAlignment() {
    return this._alignment;
  }
  setContentAlignment(alignment) {
    this._contentAlignment = alignment;
    return this;
  }
  getContentAlignment() {
    return this._contentAlignment;
  }
  build() {
    return {
      name: this._name,
      colSpan: this._colSpan,
      colOrder: this._colOrder,
      alignment: this._alignment,
      contentAlignment: this._contentAlignment
    };
  }
};
var ColumnsConfigBuilder = class {
  constructor() {
    this._columns = [];
  }
  addColumn(column) {
    this._columns.push(column);
    return this;
  }
  removeColumn(columnName) {
    this._columns = this._columns.filter((col) => col.getName() !== columnName);
    return this;
  }
  getColumn(columnName) {
    return this._columns.find((col) => col.getName() === columnName);
  }
  sortByOrder() {
    this._columns.sort((a, b) => a.getColOrder() - b.getColOrder());
    return this;
  }
  getColumns() {
    return [...this._columns];
  }
  build() {
    return this._columns.map((column) => column.build());
  }
};
var HTableConfigBuilder = class {
  constructor() {
    this._categoryGroupStyle = new CategoryGroupStyleBuilder();
    this._headerStyle = new HeaderStyleBuilder();
    this._rowStyle = new RowStyleBuilder();
    this._columnsConfig = new ColumnsConfigBuilder();
    this._hierarchy = /* @__PURE__ */ new Map();
    this._data = [];
    this._rowIdCounter = 0;
  }
  getCategoryGroupStyle() {
    return this._categoryGroupStyle;
  }
  getHeaderStyle() {
    return this._headerStyle;
  }
  getRowStyle() {
    return this._rowStyle;
  }
  getColumnsConfig() {
    return this._columnsConfig;
  }
  createHierarchyNode(id, left, right = "") {
    const node = new HierarchyNodeBuilder(id, left, right);
    this._hierarchy.set(id, node);
    return node;
  }
  addHierarchyNode(node) {
    this._hierarchy.set(node.getId(), node);
    return this;
  }
  addRows(category, rows) {
    const categoryId = category.getId();
    if (!this._hierarchy.has(categoryId)) {
      let inHierarchy = false;
      this._hierarchy.forEach((builder) => {
        if (builder.hasId(categoryId)) {
          inHierarchy = true;
        }
      });
      if (!inHierarchy) {
        console.error(`Category ${categoryId} does not exist in hierarchy`);
        throw new Error(`Category ${categoryId} does not exist in hierarchy`);
      }
    }
    rows.forEach((columnData, index) => {
      this._data.push({
        rowId: `${categoryId}_${this._rowIdCounter++}`,
        categoryId,
        columnData
      });
    });
    return this;
  }
  build() {
    const hierarchy = {};
    for (const [id, builder] of this._hierarchy) {
      hierarchy[id] = builder.build();
    }
    return {
      props: {
        categoryGroupStyle: this._categoryGroupStyle.build(),
        headerStyle: this._headerStyle.build(),
        rowStyle: this._rowStyle.build(),
        columnsConfig: this._columnsConfig.build()
      },
      data: {
        hierarchy,
        data: this._data
      }
    };
  }
  toHTML() {
    const config = this.build();
    return writeHTable(config);
  }
};
var OdinHTableConfigBuilder = class extends HTableConfigBuilder {
  constructor() {
    super();
    this.getHeaderStyle().addStyle("padding", "8px 0").addStyle("background-color", "rgb(52, 40, 78)").addStyle("color", "white");
    this.getCategoryGroupStyle().addStyle("padding", "8px 0").addStyle("margin-bottom", "4px").addStyle("background-color", "rgb(52, 40, 78)").addStyle("color", "white");
    this.getRowStyle().addStyle("padding", "4px 0").addStyle("fontSize", "13px").addStyle("borderBottom", "none").addStyle("lineHeight", "1.3");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategoryGroupStyleBuilder,
  ColumnBuilder,
  ColumnsConfigBuilder,
  HTableConfigBuilder,
  HeaderStyleBuilder,
  HierarchyNodeBuilder,
  OdinHTableConfigBuilder,
  RowStyleBuilder
});
//# sourceMappingURL=index.js.map