const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const webpack = require("webpack");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require(
	"optimize-css-assets-webpack-plugin"
);
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack')

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		stats: "errors-only",
		host, // Defaults to `localhost`
		port, // Defaults to 8080
		open: true,
		overlay: true,
	},
});

exports.loadCSS = ({ include, exclude } = {}) => ({
	module: {
		rules: [
		{
			test: /\.scss$/,
			include,
			exclude,
			use: ["style-loader", "css-loader", "sass-loader"],
		},
		],
	},
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				include,
				exclude,
				use: {
					loader: "url-loader",
					options,
				},
			},
		],
	},
});

exports.loadFonts = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
			},
		],
	},
});

exports.extractCSS = ({ include, exclude, use = [] }) => {

	// Output extracted CSS to a file
	const plugin = new MiniCssExtractPlugin({
		filename: "src/[name].[contenthash:8].css",
	});

	return {
		module: {
			rules: [
				{
					test: /\.scss$/,
					include,
					exclude,
					use: [
						MiniCssExtractPlugin.loader,
					].concat(use),
				},
			],
		},
		plugins: [plugin],
	};
};

exports.purifyCSS = ({ paths }) => ({
	plugins: [new PurifyCSSPlugin({ paths, minimize : true })],
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include,
				exclude,
				use: "babel-loader",
			},
		],
	},
});

exports.clean = path => ({
	plugins: [new CleanWebpackPlugin([path])],
});

exports.attachRevision = () => ({
	plugins: [
		new webpack.BannerPlugin({
			banner: new GitRevisionPlugin().version(),
		}),
	],
});

exports.minifyJavaScript = () => ({
	optimization: {
		minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
	},
});

exports.minifyCSS = ({ options }) => ({
	plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: options,
			canPrint: false,
		}),
	],
});

// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// Creating the index file
// https://www.npmjs.com/package/html-webpack-template
exports.indexTemplate = ({ options }) => ({
    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        title: options.title,
        appMountId: options.appMountId,
        inject: false,
        mobile: true,
        baseHref: './',
        meta: [
            {
                'name': 'format-detection',
                content: 'telephone=no'
            }
        ],
      })
    ]
});

exports.globalInclude = function() {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
                ReactDOM: "react-dom",
                $: "jquery",
                uuid: "uuid",
                moment: "moment",
                _: "lodash",
                Immutable: "seamless-immutable",
                Cookies: "universal-cookie",
                ReactRedux: "react-redux",
                Redux: "redux"
            }),
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ]
    };
};

exports.sassLint = () => ({
	plugins: [
		new SassLintPlugin(),
	],
});

exports.lintJavaScript = function({ include, exclude, options }) {
    return {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: include,
                    exclude: exclude,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: options,
                },
            ],
        },
    };
}