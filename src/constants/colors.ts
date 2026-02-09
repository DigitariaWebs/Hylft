export const colors = {
  primary: {
    main: '#C8F14A',
    light: '#D6F45F',
    dark: '#A4E600',
  },
  background: {
    dark: '#0B0D0E',
    darker: '#121417',
    accent: '#1B1F24',
    purple: '#B652C7',
  },
  foreground: {
    white: '#FFFFFF',
    gray: '#BFC3C7',
  },
} as const;

export type Colors = typeof colors;