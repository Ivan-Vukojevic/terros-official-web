import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { priceList, formatPrice, validFrom } from "../app/data/priceList.ts";
import { LOCAL_PRICE_XML_FILENAME } from "../app/lib/priceXml.ts";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cell = (v: string, style = "") =>
  `<Cell${style ? ` ss:StyleID="${style}"` : ""}><Data ss:Type="String">${esc(v)}</Data></Cell>`;

const rows = [
  `<Row>${cell(`Cjenik vrijedi od ${validFrom}`, "h")}</Row>`,
  `<Row>${["Grupa", "Usluga", "Jedinica", "Cijena (bez PDV-a)", "Cijena (+25% PDV)"].map((h) => cell(h, "h")).join("")}</Row>`,
  ...priceList.flatMap((g) =>
    g.items.map(
      (i) => `<Row>${[g.group, i.name, i.unit, formatPrice(i, false), formatPrice(i, true)].map((v) => cell(v)).join("")}</Row>`
    )
  ),
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles>
<Worksheet ss:Name="Cjenik"><Table>
<Column ss:Width="140"/><Column ss:Width="260"/><Column ss:Width="90"/><Column ss:Width="110"/><Column ss:Width="110"/>
${rows}
</Table></Worksheet>
</Workbook>
`;
const outputDir = path.join(process.cwd(), "public");
mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, LOCAL_PRICE_XML_FILENAME), xml);
