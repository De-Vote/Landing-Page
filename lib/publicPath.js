const prefix = process.env.GHPAGE_ROUTE

export function assetPath(path){
    // assume path is start with "/""
    return `/${prefix}${path}`
}