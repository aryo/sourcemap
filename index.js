var sourceMap = require('source-map');
var fs = require('fs');

fs.readFile('./abc.js', 'utf8', async function (err, data) {
    var smc = await new sourceMap.SourceMapConsumer(data);
    const a = [ "1:332811", "1:170490","1:1134227"];
    a.forEach(lineCol => {
        const [line, column] = lineCol.split(":");
        console.log(smc.originalPositionFor({
            line: parseInt(line),
            column: parseInt(column)
        }));
    })
    console.log(smc.originalPositionFor({
        line: parseInt(2),
        column: parseInt(406877)
    }));
});
