import { 
    JsonRpcProvider, 
    devnetConnection, 
    Ed25519Keypair, 
    RawSigner, 
    TransactionBlock 
} from "@mysten/sui.js";

const provider = new JsonRpcProvider(devnetConnection);

async function getBlockSequence() {
    let sequence = await provider.getLatestCheckpointSequenceNumber();
    console.log(sequence);
}

async function makeMoveCall() {
    const keypair = new Ed25519Keypair();
    const signer = new RawSigner(keypair, provider);
    const packageObjectId = '0x...';
    const tx = new TransactionBlock();
    tx.moveCall({
    target: `${packageObjectId}::nft::mint`,
    arguments: [tx.pure('Example NFT')],
    });
    const result = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    });
    console.log({ result });
}


async function publishPackge() {
    const { execSync } = require('child_process');
    // Generate a new Keypair
    const keypair = new Ed25519Keypair();
    const provider = new JsonRpcProvider();
    const signer = new RawSigner(keypair, provider);
    const { modules, dependencies } = JSON.parse(
    execSync(
        `${cliPath} move build --dump-bytecode-as-base64 --path ${packagePath}`,
        { encoding: 'utf-8' },
    ),
    );
    const tx = new TransactionBlock();
    const [upgradeCap] = tx.publish({
    modules,
    dependencies,
    });
    tx.transferObjects([upgradeCap], tx.pure(await signer.getAddress()));
    const result = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    });
    console.log({ result });
}