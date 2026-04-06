/* eslint-disable @typescript-eslint/no-explicit-any */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ===================================
         COLORS - Using CSS Variables
         =================================== */
      colors: {
        /* Primary Colors */
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          DEFAULT: 'var(--color-primary)',
        },

        /* Success Colors */
        success: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          dark: 'var(--color-success-dark)',
          light: 'var(--color-success-light)',
          DEFAULT: 'var(--color-success)',
        },

        /* Warning Colors */
        warning: {
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          500: 'var(--color-warning)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          dark: 'var(--color-warning-dark)',
          light: 'var(--color-warning-light)',
          DEFAULT: 'var(--color-warning)',
        },

        /* Error Colors */
        error: {
          50: 'var(--color-error-50)',
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
          400: 'var(--color-error-400)',
          500: 'var(--color-error)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          dark: 'var(--color-error-dark)',
          light: 'var(--color-error-light)',
          DEFAULT: 'var(--color-error)',
        },

        /* Neutral/Gray Colors */
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },

        /* Semantic Colors */
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverted: 'var(--color-text-inverted)',
        },

        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          dark: 'var(--color-bg-dark)',
        },

        border: {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
          dark: 'var(--color-border-dark)',
        },

        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          active: 'var(--color-surface-active)',
        },

        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          active: 'var(--color-accent-active)',
          disabled: 'var(--color-accent-disabled)',
        },
      },

      /* ===================================
         TYPOGRAPHY
         =================================== */
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },

      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },

      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
      },

      /* ===================================
         SPACING
         =================================== */
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },

      /* ===================================
         BORDER RADIUS
         =================================== */
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      /* ===================================
         BOX SHADOW
         =================================== */
      boxShadow: {
        sm: '0 1px 2px var(--color-shadow-sm)',
        md: '0 4px 6px var(--color-shadow-md)',
        lg: '0 10px 15px var(--color-shadow-lg)',
        xl: '0 20px 25px var(--color-shadow-xl)',
        'primary-glow': '0 4px 12px rgba(0, 85, 204, 0.2)',
        'success-glow': '0 4px 12px rgba(16, 185, 129, 0.2)',
        'warning-glow': '0 4px 12px rgba(245, 158, 11, 0.2)',
        'error-glow': '0 4px 12px rgba(239, 68, 68, 0.2)',
      },

      /* ===================================
         TRANSITIONS & ANIMATIONS
         =================================== */
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },

      animation: {
        'fade-in': 'fadeIn var(--transition-slow)',
        'slide-up': 'slideInUp var(--transition-slow)',
        'slide-down': 'slideInDown var(--transition-slow)',
        'pulse-light': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      /* ===================================
         Z-INDEX SCALE
         =================================== */
      zIndex: {
        base: '0',
        dropdown: '10',
        sticky: '20',
        'modal-backdrop': '40',
        modal: '50',
        popover: '60',
        tooltip: '70',
        notification: '80',
      },

      /* ===================================
         GRADIENTS
         =================================== */
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        'gradient-success': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-success) 100%)',
        'gradient-learning-progress': 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-success) 100%)',
      },

      /* ===================================
         BACKDROP BLUR
         =================================== */
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
      },

      /* ===================================
         CUSTOM COMPONENTS
         =================================== */
      opacity: {
        disabled: '0.5',
      },
    },
  },

  plugins: [
    /* Add custom utilities */
    function ({ addComponents, theme }: any) {
      addComponents({
        /* Card Component */
        '.card': {
          backgroundColor: theme('colors.surface.DEFAULT'),
          border: `1px solid ${theme('colors.border.DEFAULT')}`,
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.lg'),
          boxShadow: theme('boxShadow.sm'),
          transition: 'all var(--transition-base)',

          '&:hover': {
            boxShadow: theme('boxShadow.md'),
          },
        },

        /* Alert Components */
        '.alert-success': {
          backgroundColor: theme('colors.success.light'),
          borderLeft: `4px solid ${theme('colors.success.DEFAULT')}`,
          borderRadius: theme('borderRadius.md'),
          padding: theme('spacing.lg'),
          color: theme('colors.success.dark'),
        },

        '.alert-warning': {
          backgroundColor: theme('colors.warning.light'),
          borderLeft: `4px solid ${theme('colors.warning.DEFAULT')}`,
          borderRadius: theme('borderRadius.md'),
          padding: theme('spacing.lg'),
          color: theme('colors.warning.dark'),
        },

        '.alert-error': {
          backgroundColor: theme('colors.error.light'),
          borderLeft: `4px solid ${theme('colors.error.DEFAULT')}`,
          borderRadius: theme('borderRadius.md'),
          padding: theme('spacing.lg'),
          color: theme('colors.error.dark'),
        },

        /* Badge Component */
        '.badge': {
          display: 'inline-block',
          padding: `${theme('spacing.sm')} ${theme('spacing.md')}`,
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.semibold'),
        },

        '.badge-primary': {
          backgroundColor: theme('colors.primary.light'),
          color: theme('colors.primary.dark'),
        },

        '.badge-success': {
          backgroundColor: theme('colors.success.light'),
          color: theme('colors.success.dark'),
        },

        '.badge-warning': {
          backgroundColor: theme('colors.warning.light'),
          color: theme('colors.warning.dark'),
        },

        '.badge-error': {
          backgroundColor: theme('colors.error.light'),
          color: theme('colors.error.dark'),
        },

        /* Button Components */
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: theme('fontWeight.semibold'),
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.md')} ${theme('spacing.lg')}`,
          cursor: 'pointer',
          transition: 'all var(--transition-base)',
          border: 'none',
          fontSize: theme('fontSize.base'),

          '&:focus-visible': {
            outline: `2px solid ${theme('colors.primary.DEFAULT')}`,
            outlineOffset: '2px',
          },
        },

        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.text.inverted'),

          '&:hover': {
            backgroundColor: theme('colors.primary.dark'),
            boxShadow: theme('boxShadow.primary-glow'),
          },

          '&:active': {
            backgroundColor: '#002D66',
          },

          '&:disabled': {
            backgroundColor: theme('colors.accent.disabled'),
            cursor: 'not-allowed',
          },
        },

        '.btn-success': {
          backgroundColor: theme('colors.success.DEFAULT'),
          color: theme('colors.text.inverted'),

          '&:hover': {
            backgroundColor: theme('colors.success.dark'),
            boxShadow: theme('boxShadow.success-glow'),
          },
        },

        '.btn-secondary': {
          backgroundColor: theme('colors.bg.tertiary'),
          color: theme('colors.text.primary'),
          border: `1px solid ${theme('colors.border.DEFAULT')}`,

          '&:hover': {
            backgroundColor: theme('colors.bg.secondary'),
          },
        },

        '.btn-outline': {
          border: `1px solid ${theme('colors.primary.DEFAULT')}`,
          color: theme('colors.primary.DEFAULT'),
          backgroundColor: 'transparent',

          '&:hover': {
            backgroundColor: theme('colors.primary.50'),
          },
        },

        /* Text Utilities */
        '.text-primary': {
          color: theme('colors.text.primary'),
        },

        '.text-secondary': {
          color: theme('colors.text.secondary'),
        },

        '.text-tertiary': {
          color: theme('colors.text.tertiary'),
        },

        /* Input Utilities */
        '.input': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.base'),
          color: theme('colors.text.primary'),
          backgroundColor: theme('colors.bg.primary'),
          border: `1px solid ${theme('colors.border.DEFAULT')}`,
          borderRadius: theme('borderRadius.md'),
          padding: theme('spacing.md'),
          transition: 'all var(--transition-base)',
          width: '100%',

          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.DEFAULT'),
            boxShadow: `0 0 0 3px ${theme('colors.primary.100')}`,
          },

          '&:disabled': {
            backgroundColor: theme('colors.bg.tertiary'),
            color: theme('colors.text.tertiary'),
            cursor: 'not-allowed',
          },
        },

        '.input-error': {
          borderColor: theme('colors.error.DEFAULT'),

          '&:focus': {
            boxShadow: `0 0 0 3px ${theme('colors.error.100')}`,
          },
        },

        /* Focus Visible Utility */
        '.focus-ring': {
          outline: `2px solid ${theme('colors.primary.DEFAULT')}`,
          outlineOffset: '2px',
        },
      })
    },
  ],
}

export default config