const parseEnv = () => {
    const envPrefix = 'RSS_';
    let result = [];

    Object.entries(process.env).map(([envName, envValue ]) => {
        if (envName.includes(envPrefix)) {
            result.push(`${envName}=${envValue}`)
        }
    });

    console.log(result.join('; '))
};

parseEnv();