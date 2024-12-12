import webpack from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types';
export interface EnvVariables {
    mode: 'production' | 'development';
    port: number;
}
export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        entry: paths.enrty,

        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,

        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
    };
}
