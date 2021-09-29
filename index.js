const sourceMap = require("source-map");
const fs = require("fs");

const stacktrace = `
Error: Unhandled error.
  at n.s.emit(app:///build/static/js/2.2d907962.chunk.js:2:143638)
  at n.<anonymous>(app:///build/static/js/2.2d907962.chunk.js:2:3039390)
  at l(app:///build/static/js/2.2d907962.chunk.js:2:2583933)
  at Generator._invoke(app:///build/static/js/2.2d907962.chunk.js:2:2583721)
  at Generator.throw(app:///build/static/js/2.2d907962.chunk.js:2:2584358)
  at l(app:///build/static/js/2.2d907962.chunk.js:2:2583933)
  at n(app:///build/static/js/2.2d907962.chunk.js:2:2584419)
  at ? (app:///build/static/js/2.2d907962.chunk.js:2:2584595)
`;
const filePath = "./6.45.0.js";

fs.readFile(filePath, "utf8", async function (err, data) {
    var smc = await new sourceMap.SourceMapConsumer(data);

    const header = stacktrace.split("\n").find(line => line.trim().length > 0);
    header && console.log(header);

    const lineCols = stacktrace.match(/[^.*](\d+:\d+)[^\)]/g);
    lineCols.forEach(lineCol => {
        const [_, mappedLine, mappedCol] = lineCol.split(":");
        const { source, line, column, name } = smc.originalPositionFor({
            line: parseInt(mappedLine),
            column: parseInt(mappedCol),
        })
        console.log(`  at ${name} (${source}:${line}:${column})`);
    });
});
