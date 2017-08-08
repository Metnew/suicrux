module.exports = ({file, options, env}) => ({
	plugins: {
		'postcss-import': {},
		'postcss-cssnext': options.cssnext ? {} : false,
		autoprefixer: env === 'production' ? {} : false,
		// stylelint: env === 'production'
		//   ? false
		//   : {
		//     extends: ['stylelint-config-standard'],
		//     rules: {
		//       indentation: 'tab'
		//     }
		//   },
		'postcss-browser-reporter': {},
		'postcss-reporter': {}
	}
})
