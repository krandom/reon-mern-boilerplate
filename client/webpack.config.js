const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
	app: path.join(__dirname, "src/app"),
	build: path.join(__dirname, "dist"),
	style: glob.sync('./src/css/main.scss'),
};

const commonConfig = merge([
	{
		// Entry accepts a path or an object of entries.
		// We'll be using the latter form given it's
		// convenient with more complex configurations.
		//
		// Entries have to resolve to files! It relies on Node.js
		// convention by default so if a directory contains *index.js*,
		// it will resolve to that.
		entry: {
			// hmr: [
			// 	// Include the client code.
			// 	// Note how the host/port setting maps here.
			// 	'webpack-dev-server/client?http://localhost:8080',
			// 	// Hot reload only when compiled successfully
			// 	'webpack/hot/only-dev-server',
			// 	// Alternative with refresh on failure
			// 	// 'webpack/hot/dev-server',
			// ],
			app: PATHS.app,
			style: PATHS.style,
		},
		output: {
			publicPath: '/'
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "Webpack demo",
			}),
		],
		resolve: {
			extensions: ['.js', '.jsx'],
		},
	},
	parts.indexTemplate({ options : {
		title: 'CHECKOUT',
		appMountId: 'template',
		baseHref: '',
		devServer: ''
	} }),
	parts.loadFonts(),
	parts.loadJavaScript({ include: PATHS.app }),
	parts.globalInclude(),
	parts.sassLint(),
	parts.lintJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
	{
		output: {
			chunkFilename: "src/[name].[chunkhash:8].js",
			filename: "src/[name].[chunkhash:8].js",
		},
	},
	parts.clean(PATHS.build),
	parts.minifyJavaScript(),
	parts.minifyCSS({
		options: {
			discardComments: {
				removeAll: true,
			},

			// Run cssnano in safe mode to avoid
			// potentially unsafe transformations.
			safe: true,
		},
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: "[name].[hash:8].[ext]",
		},
	}),
	parts.extractCSS({
		use: ["css-loader", "sass-loader"]
	}),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
	}),
	{
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "initial",
					},
				},
			},
			runtimeChunk: {
				name: "manifest",
			},
		},
	},
	parts.attachRevision(),
]);

const developmentConfig = merge([
	parts.devServer({
		// Customize host/port here if needed
		host: process.env.HOST,
		port: process.env.PORT,
	}),
	parts.loadImages(),
	parts.loadCSS(),
]);

module.exports = mode => {

	if (mode === "production") {
		return merge(commonConfig, productionConfig, { mode });
	}

	return merge(commonConfig, developmentConfig, { mode });
};