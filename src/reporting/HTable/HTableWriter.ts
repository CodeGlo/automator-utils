import { HTableConfig, HTableProps, HierarchyNode } from ".";

export const writeCategoryGroup = (
  categoryGroupStyle: HTableProps["categoryGroupStyle"] = {},
  depth: number,
  left: string,
  right: string,
  columnConfig: HTableProps["columnsConfig"]
): string => {
  // Convert style object to CSS string
  const styleString = Object.entries(categoryGroupStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join(";");

  // Calculate padding-left based on depth, with minimum of 0.5rem
  const paddingLeft = Math.max(depth * 20, 8) + 8; // 8px = 0.5rem

  // Calculate right text position to align with rightmost column
  const rightColumnWidth =
    columnConfig.length > 0
      ? (columnConfig.sort((a, b) => a.colOrder - b.colOrder).slice(-1)[0]
          ?.colSpan ?? 1) * 100
      : 100;

  // Combine the original style with the depth-based padding and background color
  const finalStyle = `${styleString}; padding-left: ${paddingLeft}px; padding-bottom: 0; margin-bottom: 0; position: relative`;

  const headingTag = depth === 0 ? "h2" : "h3";

  return `
    <div style="${finalStyle}">
      <${headingTag} style="display: flex; margin: 0; justify-content: space-between; padding-right: ${
    rightColumnWidth / 2
  }px">
        <span>${left}</span>
        <span>${right}</span>
      </${headingTag}>
    </div>
  `.trim();
};

export const writeRow = (
  rowStyle: HTableProps["rowStyle"] = {},
  columnConfig: HTableProps["columnsConfig"],
  columnData: { [columnName: string]: string },
  depth: number
): string => {
  // Convert style object to CSS string
  const styleString = Object.entries(rowStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join(";");

  // Calculate indent width based on depth
  const indentWidth = Math.max(depth * 20, 8) + 8;

  // Generate table cells based on column configuration
  const cells = [
    `<td style="width: ${indentWidth}px"></td>`,
    ...columnConfig.map((column) => {
      const content = columnData[column.name] || "";
      const contentAlignment = column.contentAlignment || "center";
      return `<td style="padding: 2px 8px; text-align: ${contentAlignment}">${content}</td>`;
    }),
  ].join("");

  return `<tr style="${styleString}">${cells}</tr>`.trim();
};

type HierarchyPath = {
  categoryName: string;
  left: string;
  right: string;
  depth: number;
}[];

export const writeTable = (
  props: HTableProps,
  depth: number,
  categoryName: string,
  rowData: any[]
): string => {
  const indentWidth = Math.max(depth * 20, 8) + 8;

  // Convert style object to CSS string
  const headerStyleString = Object.entries(props.headerStyle || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(";");

  // Find and render all rows for this category
  const categoryRows = rowData.filter((row) => row.categoryId === categoryName);
  const rows = categoryRows
    .map((row) =>
      writeRow(props.rowStyle, props.columnsConfig, row.columnData, depth)
    )
    .join("\n");

  return `
    <div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="${headerStyleString}">
            <th style="width: ${indentWidth}px; padding: 12px 8px;"></th>
            ${props.columnsConfig
              .sort((a, b) => a.colOrder - b.colOrder)
              .map((col) => {
                const width = col.colSpan
                  ? `width: ${col.colSpan * 100}px;`
                  : "";
                const alignment = col.alignment || "center";
                return `<th style="padding: 12px 8px; text-align: ${alignment}; ${width}">${col.name}</th>`;
              })
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
};

export const WriteReport = (config: HTableConfig): string => {
  const { props, data } = config;
  const { hierarchy, data: rowData } = data;

  const processCategory = (
    categoryName: string,
    category: HierarchyNode,
    depth: number,
    output: string[] = [],
    hierarchyPath: HierarchyPath = []
  ): string[] => {
    // Add current category to the hierarchy path
    const currentPath = [
      ...hierarchyPath,
      {
        categoryName,
        left: category.left,
        right: category.right,
        depth,
      },
    ];

    // Check if this category has any associated row data
    const hasRowData = rowData.some((row) => row.categoryId === categoryName);

    if (hasRowData) {
      // Write all hierarchy levels first
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
      // Then render the table
      output.push(writeTable(props, depth, categoryName, rowData));
    }

    // Process children regardless of whether current node had data
    if (category.children) {
      // Sort children alphabetically
      const sortedChildren = Object.entries(category.children).sort(
        ([a], [b]) => a.localeCompare(b)
      );

      // Process each child with the current path
      for (const [childId, childNode] of sortedChildren) {
        processCategory(childId, childNode, depth + 1, output, currentPath);
      }
    }

    return output;
  };

  // Start processing from root categories
  const sortedRootCategories = Object.entries(hierarchy).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const reportParts: string[] = [];
  for (const [categoryName, category] of sortedRootCategories) {
    processCategory(categoryName, category, 0, reportParts);
  }

  // Wrap everything in a container div
  return `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: white; max-width: 1200px; margin: 0 auto; padding: 20px;">
        ${reportParts.join("\n")}
      </div>
    `;
};
