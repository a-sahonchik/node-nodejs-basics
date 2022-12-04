import { createGzip } from 'node:zlib';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname } from 'node:path';
import {fileURLToPath} from "node:url";

const compress = async () => {
    async function do_gzip(input, output) {
        const gzip = createGzip();
        const pipe = promisify(pipeline);
        const source = createReadStream(input);
        const destination = createWriteStream(output);
        await pipe(source, gzip, destination);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToCompress = `${__dirname}/files/fileToCompress.txt`;
    const compressedFile = `${__dirname}/files/archive.gz`;

    try {
        await do_gzip(fileToCompress, compressedFile);
    } catch(err) {
        console.error(err);
    }
};

await compress();