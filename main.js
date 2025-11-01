import { generateEmployeeData } from "./src/generateEmployeeData.js";
import { getEmployeeChartContent } from "./src/getEmployeeChartContent.js";
import { fileURLToPath } from "url";
import path from "path";

export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeChartContent(employees);
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const dtoIn = { count: 20, age: { min: 19, max: 35 } };

  const employees = generateEmployeeData(dtoIn);
  const outTop5 = getEmployeeChartContent(employees);
  const outAll  = getEmployeeChartContent(employees, 0);

  // ===== ÚKOL 3 – Vygenerovaný seznam zaměstnanců =====
  console.log("=== ÚKOL 3 ===");
  console.log(JSON.stringify(employees, null, 2));

  // ===== ÚKOL 5 – Počítání záznamů a rozdělování jich =====
  const formatNamesObject = (obj) => {
    const pairs = Object.entries(obj).map(([k, v]) => `"${k}": ${v}`);
    return "{ " + pairs.join(", ") + " }";
  };
  const formatChartArray = (arr) => {
    const lines = arr.map((o, i) =>
      ` {label: "${o.label}", value: ${o.value}}${i < arr.length - 1 ? "," : ""}`
    );
    return "[\n" + lines.join("\n") + "\n]";
  };

  console.log("\n=== ÚKOL 5 ===\n");
  console.log("names: {");
  console.log(" all: " + formatNamesObject(outAll.names.all) + ",");
  console.log(" male: " + formatNamesObject(outAll.names.male) + ",");
  console.log(" female: " + formatNamesObject(outAll.names.female) + ",");
  console.log(" femalePartTime: " + formatNamesObject(outAll.names.femalePartTime) + ",");
  console.log(" maleFullTime: " + formatNamesObject(outAll.names.maleFullTime));
  console.log("},\n");

  console.log("chartData: {");
  console.log(" all: " + formatChartArray(outAll.chartData.all) + ",");
  console.log(" male: " + formatChartArray(outTop5.chartData.male) + ",");
  console.log(" female: " + formatChartArray(outTop5.chartData.female) + ",");
  console.log(" femalePartTime: " + formatChartArray(outTop5.chartData.femalePartTime) + ",");
  console.log(" maleFullTime: " + formatChartArray(outTop5.chartData.maleFullTime));
  console.log("}");
}
