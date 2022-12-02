import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fs from 'node:fs';
import { stdout } from 'node:process';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToRead = `${__dirname}/files/fileToRead.txt`;

    const readStream = fs.createReadStream(fileToRead);

    readStream.on('data', (chunk) => {
        stdout.write(chunk)
    });

    readStream.on('end', () => {
        stdout.write('\n')
    });

    readStream.on('error', (error) => {
        throw error;
    })
};

await read();