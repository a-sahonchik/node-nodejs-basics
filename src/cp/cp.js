import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { stdin, stdout } from 'node:process';

const args = process.argv.slice(2);

const spawnChildProcess = async (args) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const childScriptPath = `${__dirname}/files/script.js`;

        const child = fork(childScriptPath, args, { silent: true });

        stdin.pipe(child.stdin);

        child.stdout.pipe(stdout);

        child.stdout.on("data", (data) => {
            console.log(`Received from child process: ${data}`);
        });
    } catch (err) {
        throw new Error(err);
    }
};

spawnChildProcess(args);