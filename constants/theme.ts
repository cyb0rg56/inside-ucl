/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const UCL_BLUE = '#0D68CF';
export const UCL_TEAL = '#19BFC3';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#6B7280',
    background: '#fff',
    groupedBackground: '#F2F2F7',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    pressed: '#F3F4F6',
    tint: tintColorLight,
    icon: '#687076',
    iconStrong: '#1F2937',
    chevron: '#9CA3AF',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    danger: '#B91C1C',
    primary: '#2563EB',
    primaryPressed: '#1D4ED8',
    onPrimary: '#FFFFFF',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    groupedBackground: '#151718',
    surface: '#1F2427',
    border: '#2F363A',
    pressed: '#2A3034',
    tint: tintColorDark,
    icon: '#9BA1A6',
    iconStrong: '#ECEDEE',
    chevron: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    danger: '#FCA5A5',
    primary: '#60A5FA',
    primaryPressed: '#3B82F6',
    onPrimary: '#151718',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
