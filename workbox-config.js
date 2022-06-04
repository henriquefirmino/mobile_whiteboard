module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,js,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};