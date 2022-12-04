import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFile } from 'node:fs/promises';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToRead = `${__dirname}/files/fileToRead.txt`;
    const errorMessage = "FS operation failed";

    const fileContent = await readFile(fileToRead, { encoding: 'utf8' })
        .catch(() => {
            throw new Error(errorMessage)
        });

    console.log(fileContent)
};

await read();