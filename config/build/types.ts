export interface BuildPaths {
    enrty: string;
    html: string;
    output: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
}
