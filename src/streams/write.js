import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fs from 'node:fs';
import { stdin } from 'node:process';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToWrite = `${__dirname}/files/fileToWrite.txt`;

    const writeStream = fs.createWriteStream(fileToWrite);

    stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
        throw error;
    })
};

await write();