const parseArgs = () => {
    const argsList = process.argv.slice(2);
    let result = [];

    argsList.map((argName, id) => {
        if(argName.includes('--')) {
            result.push(`${argName.slice(2)} is ${argsList[id + 1]}`);
        }
    });

    console.log(result.join(', '))
};

parseArgs();