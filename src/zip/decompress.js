import { promisify } from "node:util";
import { createGunzip } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";

const decompress = async () => {
    async function do_unzip(input, output) {
        const gUnzip = createGunzip();
        const pipe = promisify(pipeline);
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, gUnzip, destination);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const compressedFile = `${__dirname}/files/archive.gz`;
    const decompressedFile = `${__dirname}/files/fileToCompress.txt`;

    try {
        await do_unzip(compressedFile, decompressedFile);
    } catch(err) {
        console.error(err);
    }
};

await decompress();