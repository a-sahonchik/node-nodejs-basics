import { isFileOrFolderExists } from '../helpers/fsHelpers.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { rename as fsRename } from 'node:fs/promises';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const wrongFilename = `${__dirname}/files/wrongFilename.txt`;
    const properFilename = `${__dirname}/files/properFilename.md`;
    const errorMessage = "FS operation failed";

    const fileCanNotBeRenamed = !(await isFileOrFolderExists(wrongFilename)) || (await isFileOrFolderExists(properFilename));

    if(fileCanNotBeRenamed) {
        throw new Error(errorMessage);
    }

    await fsRename(wrongFilename, properFilename).catch((err) => {
        throw new Error(err)
    })
};

await rename();