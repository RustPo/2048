import path from 'path';
import webpack from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths } from './config/build/types';

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        enrty: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        output: path.resolve(__dirname, 'build'),
    };

    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
    }) as webpack.Configuration;
};
