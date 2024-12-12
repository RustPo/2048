import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { mode, port, paths } = options;

    const isDev = mode === 'development';

    const scssLoader = {
        test: /\.css$/, // Обработка CSS-файлов
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [scssLoader, tsLoader];
}
