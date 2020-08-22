import fs from 'fs';

export function readConfigOrDefault<T>(path: string, defaultConf: T): T{
    try{
        let res = fs.readFileSync(path);
        return JSON.parse(res.toString());
    }
    catch(e){
        fs.writeFileSync(path, JSON.stringify(defaultConf));
        return defaultConf;
    }
}

export function writeConf<T>(path: string, conf: T){
    fs.writeFileSync(path, JSON.stringify(conf));
}