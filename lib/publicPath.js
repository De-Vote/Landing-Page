const prefix = process.env.GHPAGE_ROUTE

export function assetPath(path){
    // assume path is start with "/""
    if(prefix)return `/${prefix}${path}`
    else return `${path}`
}