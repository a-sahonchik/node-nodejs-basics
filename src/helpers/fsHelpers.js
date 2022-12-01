import { access, constants } from "node:fs/promises";

async function isFileOrFolderExists(path) {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch(err) {
        return false;
    }
}

export { isFileOrFolderExists }