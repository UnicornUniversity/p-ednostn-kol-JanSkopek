function entriesSorted(counts) {
  return Object.entries(counts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "cs")
  );
}

function toChartArray(counts, topN = 5) {
  const arr = entriesSorted(counts).map(([label, value]) => ({ label, value }));
  return topN > 0 ? arr.slice(0, topN) : arr;
}

function toSortedObject(counts) {
  const out = {};
  for (const [k, v] of entriesSorted(counts)) out[k] = v;
  return out;
}

function nameCounts(employees, predicate) {
  const map = {};
  for (const e of employees) {
    if (!predicate(e)) continue;
    map[e.name] = (map[e.name] ?? 0) + 1;
  }
  return map;
}

/**
 * @param {Array<{gender:string,birthdate:string,name:string,surname:string,workload:number}>} employees
 * @param {number} [topN=5]
 */
export function getEmployeeChartContent(employees, topN = 5) {
  const allCounts = nameCounts(employees, () => true);
  const maleCounts = nameCounts(employees, e => e.gender === "male");
  const femaleCounts = nameCounts(employees, e => e.gender === "female");
  const femalePartTimeCounts = nameCounts(employees, e => e.gender === "female" && e.workload !== 40);
  const maleFullTimeCounts = nameCounts(employees, e => e.gender === "male" && e.workload === 40);

  return {
    names: {
      all: toSortedObject(allCounts),
      male: toSortedObject(maleCounts),
      female: toSortedObject(femaleCounts),
      femalePartTime: toSortedObject(femalePartTimeCounts),
      maleFullTime: toSortedObject(maleFullTimeCounts)
    },
    chartData: {
      all: toChartArray(allCounts, topN),
      male: toChartArray(maleCounts, topN),
      female: toChartArray(femaleCounts, topN),
      femalePartTime: toChartArray(femalePartTimeCounts, topN),
      maleFullTime: toChartArray(maleFullTimeCounts, topN)
    }
  };
}
