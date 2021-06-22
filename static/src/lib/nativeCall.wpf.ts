const sender = (window  as any).chrome.jsBridge;

export async function nativeCall<A, R>(fn: string, args?: A): Promise<R> {
    sender.send(fn, args);
    return new Promise((res, rej) => {
        sender.once(fn + '-reply', (e: any, arg: R)=> {
            res(arg as R);
        });
    });
}