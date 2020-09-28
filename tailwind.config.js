'use strict';
module.exports = {
	purge: [],
	theme: {
		screens: {
			min: '200px',
			ip: '430px',
			ph: '620px',
			xs: '760px',
			sm: '890px',
			md: '1120px',
			lg: '1260px',
			xl: '1560px',
			hd: '1920px',
			'2k': '2048px',
			'4k': '3840px'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: {
				default: '#080913',
				pure: '#000000',
				80: 'rgba(8, 9, 19, 0.80)',
				50: 'rgba(8, 9, 19, 0.50)',
				30: 'rgba(8, 9, 19, 0.30)',
				20: 'rgba(8, 9, 19, 0.20)',
				10: 'rgba(8, 9, 19, 0.10)',
				'05': 'rgba(8, 9, 19, 0.05)'
			},
			white: {
				default: '#fff',
				80: 'rgba(255,255,255,0.8)',
				50: 'rgba(255,255,255,0.5)',
				20: 'rgba(255,255,255,0.2)',
				0: 'rgba(255,255,255,0)'
			},
			
		},
		backgroundColor: (theme) => ({
			main: {
				default: theme('colors.white.default'),
				reverse: theme('colors.black.default')
			},
		}),
		textColor: (theme) => ({
			main: {
				default: theme('colors.black.default'),
				reverse: theme('colors.white.default')
			},
		}),
		borderColor: (theme) => ({
			current: 'currentColor',
			transparent: 'transparent',
			main: {
				default: theme('colors.black.default'),
				reverse: theme('colors.white.default')
			},
		}),
		placeholderColor: (theme) => ({
			default: theme('textColor')
		}),
		spacing: {
			0: '0',
			px: '1px',
			pico: '1rem',
			nano: '3rem',
			micro: '8rem',
			thinnest: '12rem',
			thinner: '16rem',
			thin: '20rem',
			broad: '32rem',
			broader: '40rem',
			broadest: '48rem',
			large: '72rem',
			larger: '90rem',
			largest: '140rem',
			mega: '220rem',
			giga: '375rem',
			tera: '480rem',
			tiniest: '640rem',
			tinier: '720rem',
			tiny: '790rem',
			smallest: '880rem',
			smaller: '1200rem',
			small: '1300rem',
			big: '1450rem',
			bigger: '1600rem',
			biggest: '1800rem',
			'-pico': '-1rem',
			'-nano': '-3rem',
			'-micro': '-5rem',
			'-thinnest': '-10rem',
			'-thinner': '-16rem',
			'-thin': '-20rem',
			'-thin+': '-30rem',
			'-broad': '-40rem',
			'-broader': '-60rem',
			'-broadest': '-80rem',
			'-large': '-100rem',
			'-larger': '-120rem',
			'-largest': '-180rem',
			'-mega': '-220rem',
			'-giga': '-375rem',
			'-tera': '-480rem',
			'-tiniest': '-640rem',
			'-tinier': '-720rem',
			'-tiny': '-790rem',
			'-smallest': '-946rem',
			'-smaller': '-1200rem',
			'-small': '-1300rem',
			'-big': '-1450rem',
			'-bigger': '-1600rem',
			'-biggest': '-1800rem'
		},
		maxWidth: (theme) => ({
			none: 'none',
			full: '100%',
			'9/10': '90%',
			'3/4': '75%',
			'1/2': '50%',
			...theme('spacing'),
			...theme('screens')
		}),
		minWidth: (theme) => ({
			none: 'none',
			full: '100%',
			...theme('spacing'),
			...theme('screens')
		}),
		fontFamily: {
			sans: [
				'Helvetica Neue',
				'Arial',
				'sans-serif'
			],
			serif: [
				'Georgia',
				'Times New Roman',
				'serif'
			]
		},
		fontSize: {
			miniature: '12rem',
			shortest: '13rem',
			shorter: '14rem',
			short: '16rem',
			current: '18rem',
			tall: '24rem',
			taller: '28rem',
			tallest: '32rem',
			huge: '54rem',
			huger: '60rem',
			hugest: '80rem',
			big: '104rem',
			giant: '120rem',
			enormous: '300rem'
		},
		lineHeight: {
			compressed: '1.1',
			tightest: '1.2',
			tighter: '1.3',
			tight: '1.45',
			normal: '1.6',
			loose: '1.7'
		},
		borderWidth: {
			none: '0',
			slimmest: '1px',
			slimmer: '2px',
			slim: '4px',
			thinnest: '5px'
		},
		borderRadius: {
			none: '0',
			sharper: '6px',
			sharp: '8px',
			soft: '14px',
			dull: '32px',
			duller: '72px',
			full: '100%'
		},
		extend: {
			listStyleType: {
				roman: 'lower-roman',
				alpha: 'lower-alpha',
				circle: 'circle',
				square: 'square'
			},
			gridTemplateColumns: {
				'auto-center': '1fr auto 1fr'
			},
			padding: {
				'1/2': '50%',
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'4/3': '133.333333%',
				'1/4': '25%',
				'2/4': '50%',
				'3/4': '75%',
				'5/4': '125%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'6/5': '120%',
				'1/6': '16.666667%',
				'2/6': '33.333333%',
				'3/6': '50%',
				'4/6': '66.666667%',
				'5/6': '83.333333%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
				'9/16': '56.25%',
				30: '30%',
				full: '100%'
			},
			height: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%'
			},
			width: {
				'9/20': '45%'
			},
			inset: (theme) => ({
				...theme('spacing'),
				'1/2': '50%',
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'1/4': '25%',
				'2/4': '50%',
				'3/4': '75%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'1/6': '16.666667%',
				'2/6': '33.333333%',
				'3/6': '50%',
				'4/6': '66.666667%',
				'5/6': '83.333333%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
				'9/16': '56.25%',
				full: '100%',
				'-1/2': '-50%',
				'-1/3': '-33.333333%',
				'-2/3': '-66.666667%',
				'-1/4': '-25%',
				'-2/4': '-50%',
				'-3/4': '-75%',
				'-1/5': '-20%',
				'-2/5': '-40%',
				'-3/5': '-60%',
				'-4/5': '-80%',
				'-1/6': '-16.666667%',
				'-2/6': '-33.333333%',
				'-3/6': '-50%',
				'-4/6': '-66.666667%',
				'-5/6': '-83.333333%',
				'-1/12': '-8.333333%',
				'-2/12': '-16.666667%',
				'-3/12': '-25%',
				'-4/12': '-33.333333%',
				'-5/12': '-41.666667%',
				'-6/12': '-50%',
				'-7/12': '-58.333333%',
				'-8/12': '-66.666667%',
				'-9/12': '-75%',
				'-10/12': '-83.333333%',
				'-11/12': '-91.666667%',
				'-9/16': '-56.25%',
				'-full': '-100%'
			})
		}
	},
	variants: {
		padding: ['responsive', 'first'],
		margin: ['responsive', 'first'],
	},
	plugins: []
};
