import {
    JsonRpcProvider,
    devnetConnection,
} from "@mysten/sui.js";


const provider: JsonRpcProvider = new JsonRpcProvider(devnetConnection);

(async () => {
    let version = await provider.getRpcApiVersion();
    console.log(version);
})();

(async () => { 
    let method: string = "suix_getCommitteeInfo";
    let args: any[] = [];
    let result = await provider.call(method, args );
    console.log(result);
})()