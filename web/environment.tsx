type ImportMetaEnv = {
    readonly baseURL: string;
}


/////////////////////////
//    env variables    //
/////////////////////////

// set variables
const variables = {
    // base url
    baseURL: import.meta.env.VITE_BASE_URL
} as ImportMetaEnv;



export { variables };