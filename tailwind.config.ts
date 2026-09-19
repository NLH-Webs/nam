import type { Config } from "tailwindcss";

// A Tailwind colour that reads an NLH token and still supports opacity modifiers (bg-black/50).
const tok = (name: string) => `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;
const neutral = {
	50: tok('--bg-sunken'), 100: tok('--bg-sunken'),
	200: tok('--line-hairline'), 300: tok('--line-strong'),
	400: tok('--text-disabled'), 500: tok('--text-tertiary'),
	600: tok('--text-secondary'), 700: tok('--text-secondary'),
	800: tok('--text-primary'), 900: tok('--text-primary'), 950: tok('--text-primary')
};
const brandScale = {
	50: tok('--bg-sunken'), 100: tok('--bg-selected'), 200: tok('--line-strong'),
	300: tok('--action'), 400: tok('--action'), 500: tok('--action'), 600: tok('--action'),
	700: tok('--action-ink'), 800: tok('--action-ink'), 900: tok('--action-ink')
};
const stateScale = (v: string) => ({
	50: tok('--bg-sunken'), 100: tok('--bg-sunken'), 200: tok('--line-strong'),
	300: tok(v), 400: tok(v), 500: tok(v), 600: tok(v), 700: tok(v), 800: tok(v), 900: tok(v)
});

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				// Every colour resolves to an NLH token (src/styles/nlh/nlh-tokens.css).
				border: tok('--line-hairline'),
				input: tok('--line-strong'),
				ring: tok('--action'),
				background: tok('--bg-base'),
				foreground: tok('--text-primary'),
				primary: { DEFAULT: tok('--action'), foreground: tok('--action-on'), light: tok('--bg-selected'), dark: tok('--action-ink') },
				secondary: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-primary') },
				destructive: { DEFAULT: tok('--state-error'), foreground: tok('--text-inverse') },
				muted: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-secondary') },
				accent: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-primary') },
				popover: { DEFAULT: tok('--bg-raised'), foreground: tok('--text-primary') },
				card: { DEFAULT: tok('--bg-raised'), foreground: tok('--text-primary') },
				sidebar: {
					DEFAULT: tok('--bg-sunken'),
					foreground: tok('--text-secondary'),
					primary: tok('--action'),
					'primary-foreground': tok('--action-on'),
					accent: tok('--bg-sunken'),
					'accent-foreground': tok('--text-primary'),
					border: tok('--line-hairline'),
					ring: tok('--action')
				},
				// Tailwind's default palette names used in components, remapped onto token roles.
				white: tok('--nlh-white'),
				black: tok('--nlh-void'),
				slate: neutral, gray: neutral, zinc: neutral, neutral: neutral, stone: neutral,
				blue: brandScale, indigo: brandScale, sky: brandScale, emerald: brandScale, teal: brandScale,
				red: stateScale('--state-error'), rose: stateScale('--state-error'),
				green: stateScale('--state-ok'),
				yellow: stateScale('--state-warn'), amber: stateScale('--state-warn'), orange: stateScale('--state-warn')
			},
			borderRadius: {
				lg: 'var(--r-md)',
				md: 'var(--r-sm)',
				sm: 'var(--r-xs)'
			},
			backgroundImage: {
				'gradient-golden': 'var(--gradient-golden)',
				'gradient-dark': 'var(--gradient-dark)'
			},
			boxShadow: {
				'golden': 'var(--shadow-golden)',
				'glow': 'var(--shadow-glow)'
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
