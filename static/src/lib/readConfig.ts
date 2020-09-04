import fs from 'fs';

export function readConfigOrDefault<T>(path: string, defaultConf: T): T{
    try{
        let res = fs.readFileSync(path);
        let rawConf = JSON.parse(res.toString());
        return SafeLoader(rawConf, defaultConf);
    }
    catch(e){
        fs.writeFileSync(path, JSON.stringify(defaultConf));
        return defaultConf;
    }
}

export function writeConf<T>(path: string, conf: T){
    fs.writeFileSync(path, JSON.stringify(conf));
}

/**
 * 该方法转换用于保证配置能向下兼容
 * @param conf 读取到的原始配置
 * @param defaultConf 默认配置
 */
function SafeLoader<T>(conf: any, defaultConf: T): T{
    let trueConf = Object.assign({}, defaultConf, conf);
    return trueConf;
}