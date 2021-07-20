const sourceMap = require("source-map");
const fs = require("fs");

const stacktrace = `
Unhandled JS Exception: TypeError: null is not an object (evaluating 'u[f]'), stack:
K@3641:14811
B@3641:14040
`;
const filePath = "./smap.map.js";

fs.readFile(filePath, "utf8", async function (err, data) {
    var smc = await new sourceMap.SourceMapConsumer(data);
    const stack = stacktraceParser.parse(stacktrace);

    const header = stacktrace.split("\n").find(line => line.trim().length > 0);
    header && console.log(header);

    const lineCols = stacktrace.match(/[^.*\:\@](\d+:\d+)[^\)\n]/g);
    lineCols.forEach(lineCol => {
        const [mappedLine, mappedCol] = lineCol.split(":");
        const { source, line, column, name } = smc.originalPositionFor({
            line: parseInt(mappedLine),
            column: parseInt(mappedCol),
        })
        console.log(`  at ${name} (${source}:${line}:${column})`);
    });
});
