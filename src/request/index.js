

export function httpRequest(flag, val) {
    return new Promise(async (resolve, reject) => {
        if (flag) {
            resolve(`成功状态${val}`)
        } else {
            console.log(val)
            const res = await httpRequest(true, val);
            resolve(res);
        }
    })
}