import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readdir } from 'node:fs/promises';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filesDirPath = `${__dirname}/files`;
    const errorMessage = "FS operation failed";

    const files = await readdir(filesDirPath)
        .catch(() => {
            throw new Error(errorMessage)
        });

    console.log(files)
};

await list();