/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        'primary-text': 'var(--primary-textColor)',
        secondary: 'var(--secondary)',
        'secondary-text': 'var(--secondary-textColor)',
        muted: 'var(--muted)',
        'muted-text': 'var(--muted-textColor)',
        accent: 'var(--accent)',
        'accent-text': 'var(--accent-textColor)',
        card: 'var(--card)',
        'card-text': 'var(--card-textColor)',
        success: 'var(--success)',
        'success-text': 'var(--success-textColor)',
        danger: 'var(--danger)',
        'danger-text': 'var(--danger-textColor)',
        warning: 'var(--warning)',
        'warning-text': 'var(--warning-textColor)',
        info: 'var(--info)',
        'info-text': 'var(--info-textColor)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
}