const { program } = require('commander');
const fs = require('fs');

program.configureOutput({
    writeErr: (str) => {
    }
});

program
	.requiredOption('-i, --input <file>', 'Input file')
	.option('-o, --output [file]', 'Output file')
	.option('-d, --display', 'Display result in console')
	.exitOverride();

try {
    program.parse();
} catch (err) {
    if (err.message.includes(`option '-i, --input <file>'`)) {
        console.error('Please, specify input file');
    } else {
         console.error('An error occurred:', err.message);
    }    process.exit(1);
}

const options = program.opts();

try {
    const inputData = fs.readFileSync(options.input, 'utf8');

    const data = JSON.parse(inputData);

    let minAsset = data[0];

    for (const asset of data) {
	if (asset.value < minAsset.value) {
	    minAsset = asset;
	}
    }
	
    const result = `${minAsset.txt}:${minAsset.value}`;

    if (options.display) {
        console.log(result);
    }

    if (options.output === undefined) {
    } else if (options.output === true) {
        fs.writeFileSync('output.json', result);
        console.log(`Data has been written to output.json`);
    } else {
	fs.writeFileSync(options.output, result);
        console.log(`Data has been written to ${options.output}`);
    }
} catch (err) {
	if (err.message.includes(`no such file or directory`)) {
		console.log('Cannot find input file');
	} else {
		console.error('Error processing file:', err.message);
		console.log(err);
	}
    process.exit(1);
}
