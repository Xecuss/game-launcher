import { NetworkInterfaceInfo } from 'os';

export interface ILocalNetwork{
    name: string;
    v4?: NetworkInterfaceInfo;
    v6?: NetworkInterfaceInfo;
}