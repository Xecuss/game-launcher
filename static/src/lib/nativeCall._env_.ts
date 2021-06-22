//该文件为placeholder，编译时会被替换为真正的文件
export async function nativeCall<A, R>(fn: string, args?: A): Promise<R> {
    return Promise.resolve({} as R);
}