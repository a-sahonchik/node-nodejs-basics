import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { cpus } from 'os';

const performCalculations = async () => {
    const workerPromises = createWorkerPromises();

    const workersResult = await Promise.allSettled(workerPromises);

    const result = workersResult.map((item) => {
        if (item.status === "fulfilled") {
            return { status: "resolve", data: item.value };
        } else {
            return { status: "error", data: null };
        }
    });

    console.log(result);
};

const createWorkerPromises = () => {
    const numOfCpus = cpus().length;
    const startFromNumber = 10;

    let workerPromises = [];

    for (let n = 0; n < numOfCpus; n++) {
        const worker = crateWorker(startFromNumber + n);
        workerPromises.push(worker);
    }

    return workerPromises;
};

const crateWorker = (number) => {
    return new Promise((resolve, reject) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const workerFile = `${__dirname}/worker.js`;

        const worker = new Worker(workerFile, {
            workerData: number,
        });

        worker.on("message", (data) => {
            resolve(data);
        });

        worker.on("error", (err) => {
            reject(err);
        });
    });
};

await performCalculations();