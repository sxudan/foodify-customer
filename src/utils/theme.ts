enum Colors {
  transparent = 'transparent',
  white = '#FFFFFF',
  black = '#000000',
  lightGrey = '#A7A7A7',
  textfieldGrey = '#D7D7D7',
  error = '#FF0000',
  primaryButton= '#222222'
}

export const Fonts = {
  // Add font definitions here for all weights
  system: 'System',
  titleSize: 22,
  titleWeight: '600',

  textTitleSizeBig: 18,

  textTitleSize: 14,
  textTitleWeight: '600',

  subTextTitleSize: 12,
  subTextTitleWeight: 'normal',
}

enum Spacing {
  horizontalDefault = 20,
  verticalDefault = 25,
}

type Theme = {
  colors: typeof Colors;
  fonts: typeof Fonts;
  spacing: typeof Spacing;
};

const theme: Theme = {
  colors: Colors,
  fonts: Fonts,
  spacing: Spacing,
};

export default theme;
