import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

const provider = new JsonRpcProvider(devnetConnection);

async function getBlockSequence() {
    let sequence = await provider.getLatestCheckpointSequenceNumber();
    console.log(sequence);
}

getBlockSequence();