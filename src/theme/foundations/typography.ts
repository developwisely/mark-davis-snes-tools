const fontList = [
  '"Google Font"',
  '"Open Sans"',
  '"Helvetica Neue"',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',');

const typography = {
  fonts: {
    body: fontList,
    heading: fontList,
  },

  fontSizes: {
    xs: '0.79rem',
    sm: '0.889rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.266rem',
    '2xl': '1.424rem',
    '3xl': '1.602rem',
    '4xl': '1.802rem',
  },

  lineHeights: {
    base: 1.75,
  },
};

export default typography;
