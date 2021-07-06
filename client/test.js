const { ExportToCsv } = require('export-to-csv');
const fs = require('fs');

var title = {
    name: 'Event 1',
    budget: '100'
};

var data = [
    {
        name: 'Test 1',
        age: [12, 13],
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    },
    {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    },
    {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    }
];

const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: title,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    fileName: 'Event Analysis'

    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

const csvExporter = new ExportToCsv(options);
const csvData = csvExporter.generateCsv(data, true);
fs.writeFileSync('data.csv', csvData);
