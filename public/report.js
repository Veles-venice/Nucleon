const data = [
  { name: "A", value: 50 },
  { name: "B", value: 75 },
  { name: "C", value: 95 },
  { name: "D", value: 85 },
  { name: "E", value: 78 },
  { name: "F", value: 72 }
];

const svg = d3.select("#barChart");


const width = 500;
const height = 220;
svg
  .attr("width", width)
  .attr("height", height);
