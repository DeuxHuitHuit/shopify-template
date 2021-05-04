'use strict';

const screenExceptions = ['touch', 'pointer'];

const except = (exceptions, object) => {
	let output = {};

	Object.keys(object).forEach((key) => {
		if (!exceptions.includes(key)) {
			output[key] = object[key];
		}
	});
	return output;
};

module.exports = {
	mode: 'jit',
	purge: {
		mode: 'layers',
		layers: ['base', 'components', 'utilities'],
		content: ['./templates/**/*.twig', './web/assets/js/**/*.js', './config/redactor/*.json'],
	},
	darkMode: 'class',
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
			'4k': '3840px',
			touch: { raw: '(hover: none)' },
			pointer: { raw: '(any-hover: hover)' },
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: {
				DEFAULT: '#33312F',
				pure: '#000000',
				80: 'rgba(0, 0, 0, 0.8)',
				60: 'rgba(0, 0, 0, 0.6)',
				50: 'rgba(0, 0, 0, 0.5)',
				40: 'rgba(0, 0, 0, 0.4)',
				30: 'rgba(0, 0, 0, 0.3)',
				20: 'rgba(0, 0, 0, 0.2)',
				10: 'rgba(0, 0, 0, 0.1)',
			},
			white: {
				DEFAULT: '#F4F2E7',
				pure: '#ffffff',
				80: 'rgba(244, 244, 244, 0.8)',
				60: 'rgba(244, 244, 244, 0.6)',
				50: 'rgba(244, 244, 244, 0.5)',
				40: 'rgba(244, 244, 244, 0.4)',
				30: 'rgba(244, 244, 244, 0.3)',
				20: 'rgba(244, 244, 244, 0.2)',
				10: 'rgba(244, 244, 244, 0.1)',
			},
			brand: {
				beige: '#E2DCC3',
				orange: '#FF6C00',
				brown: '#C54F00',
			},
		},
		spacing: (theme) => ({
			0: '0',
			'1px': '1px',
			'2px': '2px',
			20: '2rem',
			30: '4rem',
			40: '6rem',
			50: '8rem',
			60: '12rem',
			70: '16rem',
			80: '20rem',
			90: '24rem',
			100: '30rem',
			110: '36rem',
			120: '40rem',
			130: '44rem',
			140: '48rem',
			150: '56rem',
			160: '64rem',
			170: '72rem',
			180: '84rem',
			190: '96rem',
			200: '108rem',
			210: '120rem',
			220: '140rem',
			230: '160rem',
			240: '180rem',
			250: '200rem',
			260: '240rem',
			270: '280rem',
			280: '320rem',
			290: '360rem',
			300: '400rem',
			310: '440rem',
			320: '480rem',
			330: '540rem',
			340: '600rem',
			350: '660rem',
			360: '700rem',
			370: '800rem',
			380: '900rem',
			390: '1000rem',
			400: '1100rem',
			405: '1300rem',
			410: '1400rem',
			420: '1600rem',
			'1/2': '50%',
			'1/3': 'calc(100% / 3 * 1)',
			'2/3': 'calc(100% / 3 * 2)',
			'1/4': '25%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/5': '60%',
			'4/5': '80%',
			'1/10': '10%',
			'3/10': '30%',
			'7/10': '70%',
			'9/10': '90%',
			'1/20': '5%',
			'3/20': '15%',
			'7/20': '35%',
			'9/20': '45%',
			'11/20': '55%',
			'13/20': '65%',
			'17/20': '85%',
			'19/20': '95%',
			header: '64rem',
			full: '100%',
			...except(screenExceptions, theme('screens')),
		}),
		maxWidth: (theme) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing'),
		}),
		minWidth: (theme) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing'),
		}),
		maxHeight: (theme) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing'),
		}),
		minHeight: (theme) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing'),
		}),
		inset: (theme) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing'),
		}),
		fontFamily: {
			base: ['Arial', 'sans-serif'],
		},
		fontSize: (theme) => ({
			10: [
				'13rem',
				{
					lineHeight: theme('lineHeight.20'),
				},
			],
			20: [
				'16rem',
				{
					lineHeight: theme('lineHeight.20'),
					letterSpacing: theme('letterSpacing.50'),
				},
			],
			30: [
				'20rem',
				{
					lineHeight: theme('lineHeight.20'),
					letterSpacing: theme('letterSpacing.50'),
				},
			],
			40: [
				'26.5rem',
				{
					lineHeight: theme('lineHeight.20'),
					letterSpacing: theme('letterSpacing.50'),
				},
			],
			50: [
				'32rem',
				{
					lineHeight: theme('lineHeight.20'),
					letterSpacing: theme('letterSpacing.50'),
				},
			],
			60: [
				'44rem',
				{
					lineHeight: theme('lineHeight.10'),
				},
			],
			70: [
				'56rem',
				{
					lineHeight: theme('lineHeight.10'),
				},
			],
			80: [
				'96rem',
				{
					lineHeight: theme('lineHeight.10'),
				},
			],
			90: [
				'144rem',
				{
					lineHeight: theme('lineHeight.10'),
				},
			],
			100: [
				'200rem',
				{
					lineHeight: theme('lineHeight.10'),
				},
			],
		}),
		lineHeight: {
			0: '1.0',
			10: '1.1',
			20: '1.2',
			30: '1.3',
			40: '1.4',
			50: '1.5',
			60: '1.6',
		},
		borderWidth: {
			0: '0',
			10: '1px',
			20: '2px',
			30: '4px',
			40: '6px',
			50: '8px',
			60: '10px',
			70: '20px',
		},
		borderRadius: {
			0: '0',
			5: '3px',
			10: '5px',
			20: '10px',
			30: '20px',
			40: '40px',
			full: '9999px',
		},
		extend: {
			transitionTimingFunction: {
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
				'out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
			},
		},
	},
	plugins: [require('postcss-focus-visible')],
};
