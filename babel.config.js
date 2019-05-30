const isBrowser = process.env.BROWSERSLIST_ENV !== 'server';

// Use commonjs for Node
const modules = isBrowser ? false : 'commonjs';
// Use lodash-es for client and lodash for server.
const [ from, to ] = isBrowser ? [ 'lodash', 'lodash-es' ] : [ 'lodash-es', 'lodash' ];
const codeSplit = require( './server/config' ).isEnabled( 'code-splitting' );

// We implicitly use browserslist configuration in package.json for build targets.

const config = {
	presets: [
		[
			'@babel/env',
			{
				modules,
				useBuiltIns: 'entry',
				corejs: 2,
				// Exclude transforms that make all code slower, see https://github.com/facebook/create-react-app/pull/5278
				exclude: [ 'transform-typeof-symbol' ],
			},
		],
		'@automattic/calypso-build/babel/default',
	],
	plugins: [
		[ '@automattic/transform-wpcalypso-async', { async: isBrowser && codeSplit } ],
		[ './server/bundler/babel/babel-lodash-es', { from, to } ],
	],
	env: {
		build_pot: {
			plugins: [
				[
					'@automattic/babel-plugin-i18n-calypso',
					{
						dir: 'build/i18n-calypso/',
						headers: {
							'content-type': 'text/plain; charset=UTF-8',
							'x-generator': 'calypso',
						},
					},
				],
			],
		},
		test: {
			presets: [ [ '@babel/env', { targets: { node: 'current' } } ] ],
			plugins: [
				'add-module-exports',
				'babel-plugin-dynamic-import-node',
				[ './server/bundler/babel/babel-lodash-es', { from: 'lodash-es', to: 'lodash' } ],
			],
		},
	},
};

module.exports = config;
