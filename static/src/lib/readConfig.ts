import fs from 'fs';
import { join } from 'path';
import { IGameConfig, ILauncherConfig } from '../interface/config.interface';

export function readConfigOrDefault(path: string, defaultConf: ILauncherConfig): ILauncherConfig{
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
function SafeLoader(conf: any, defaultConf: ILauncherConfig): ILauncherConfig{
    let trueConf: ILauncherConfig;
    //如果不包含配置组则认为是老版本的配置
    if(!conf.configs){
        let defaultGameConfig = defaultConf.configs[0];
        let gameConfig: any = {};
        //从平铺的配置创建出gameConfig
        for(let key in defaultGameConfig){
            if(conf[key] !== undefined){
                gameConfig[key] = conf[key];
            }
            else{
                gameConfig[key] = defaultGameConfig[key as keyof IGameConfig];
            }
        }
        let tempConf: any = Object.assign({}, defaultConf);
        for(let key in defaultConf){
            if(conf[key] !== undefined){
                tempConf[key] = conf[key];
            }
            else{
                tempConf[key] = defaultConf[key as keyof ILauncherConfig];
            }
        }
        tempConf.configs = [gameConfig];
        trueConf = tempConf as ILauncherConfig;
        console.log('配置为旧版！');
    }
    else{
        trueConf = Object.assign({}, defaultConf, conf);
        console.log('配置为新版！');
    }
    return trueConf;
}
/**
 * 安全的创建文件夹
 */
export function safeCreateDir(path: string): void{
    try{
        fs.mkdirSync(path, {
            recursive: true
        });
    }
    catch(e){
        alert(`运行时报错！请将此错误信息反馈给Xs！${e}`);
    }
}

/**
 * 安全的读取spice配置文件
 */
export function safeReadSC(path: string): string{
    let created: boolean = true;

    try{ fs.accessSync(path); }
    catch(e){ created = false; }

    if(!created){
        console.log(`created: ${path}`);
        let folderPath = join(path, '../');
        safeCreateDir(folderPath);
        fs.writeFileSync(path, '');
    }

    return path;
}