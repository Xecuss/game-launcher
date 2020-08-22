import fs from 'fs/promises';

async function readConfigOrDefault<T>(path: string, defaultConf: T): Promise<T>{
    try{
        let res = await fs.readFile(path);
        return JSON.parse(res.toString());
    }
    catch(e){
        await fs.writeFile(path, JSON.stringify(defaultConf));
        return defaultConf;
    }
}