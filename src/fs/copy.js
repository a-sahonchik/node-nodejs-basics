import { isFileOrFolderExists } from '../helpers/fsHelpers.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { mkdir, readdir, copyFile } from 'node:fs/promises';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filesDirPath = `${__dirname}/files`;
    const filesCopyDirPath = `${__dirname}/files_copy`;

    const folderCanNotBeCopied = !(await isFileOrFolderExists(filesDirPath)) || (await isFileOrFolderExists(filesCopyDirPath));

    const errorMessage = "FS operation failed";

    if(folderCanNotBeCopied) {
        throw new Error(errorMessage);
    }

    try {
        await mkdir(filesCopyDirPath);
        const files = await readdir(filesDirPath);
        for (const file of files) {
            copyFile(`${filesDirPath}/${file}`, `${filesCopyDirPath}/${file}`);
        }
    } catch (err) {
        throw new Error(err);
    }
};

copy();