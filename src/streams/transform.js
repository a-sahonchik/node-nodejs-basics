import { Transform, pipeline } from 'node:stream';
import { stdin, stdout } from "node:process";

const transform = async () => {
    const strReverse = new Transform({
        transform(chunk, encoding, callback) {
            const strChunk = chunk.toString().trim();
            const reversedChunk = strChunk.toString().split('').reverse().join('');
            this.push(`${reversedChunk}\n`);
            callback();
        }
    });

    pipeline(
        stdin,
        strReverse,
        stdout,
        (err) => console.error(err)
    );
};

await transform();