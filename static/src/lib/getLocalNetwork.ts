import { ILocalNetwork } from '../interface/localNet.interface';
import { getNetworkInterface } from './callSystemAPI';

export async function getLocalNetwork(){
    let localNetworks: Array<ILocalNetwork> = [];

    let netWorkConf = await getNetworkInterface();
    for(let k in netWorkConf){
        let network = netWorkConf[k];

        if(!network) continue;

        let temp: ILocalNetwork = {
            name: k
        };

        for(let item of network){
            switch(item.family){
                case 'IPv4': {
                    temp.v4 = item;
                    break;
                }
                case 'IPv6': {
                    temp.v6 = item;
                    break;
                }
            }
        }

        if(temp.v4 !== undefined || temp.v6 !== undefined){
            localNetworks.push(temp);
        }
    }

    return localNetworks;
}