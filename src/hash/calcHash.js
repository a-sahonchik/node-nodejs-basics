import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToRead = `${__dirname}/files/fileToCalculateHashFor.txt`;

    const { createHash } = await import('node:crypto');
    const hash = createHash('sha256');
    const input = createReadStream(fileToRead);

    try {
        input.on('readable', () => {
            const data = input.read();
            if (data)
                hash.update(data);
            else {
                console.log(hash.digest('hex'));
            }
        });
    } catch (e) {
        throw new Error(e);
    }
};

await calculateHash();