import { isFileOrFolderExists } from '../helpers/fsHelpers.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { rm } from 'node:fs/promises';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToRemove = `${__dirname}/files/fileToRemove.txt`;
    const errorMessage = "FS operation failed";

    rm(fileToRemove)
        .catch(() => {
            throw new Error(errorMessage)
        });
};

await remove();