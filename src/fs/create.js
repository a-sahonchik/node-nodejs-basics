import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = `${__dirname}/files/fresh.txt`;
const errorMessage = "FS operation failed";
const fileContent = "I am fresh and young";

const create = async () => {
    writeFile(filePath, fileContent, {
        flag: 'ax'
    }).catch(() => {
        throw new Error(errorMessage)
    });
};

await create();