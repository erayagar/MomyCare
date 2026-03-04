// Renk Paleti - Premium Slate & Sky teması
export const colors = {
  // Ana Renkler (Slate)
  primary: '#0F172A',       // Koyu Slate - header ve ana bileşenler
  primaryDark: '#020617',   // Daha koyu Slate
  primaryLight: '#1E293B',  // Açık Slate
  secondary: '#0EA5E9',     // Sky Blue - aksiyon butonları
  secondaryLight: '#38BDF8',
  accent: '#F59E0B',        // Amber/Gold vurgu
  success: '#10B981',       // Zümrüt Yeşili
  warning: '#F59E0B',
  error: '#EF4444',

  // Gradient Kombinasyonları
  gradients: {
    primary: ['#0F172A', '#1E293B'],     // Slate gradient
    secondary: ['#0EA5E9', '#38BDF8'],   // Sky Blue gradient
    accent: ['#F59E0B', '#FBBF24'],      // Amber gradient
    success: ['#10B981', '#34D399'],     // Success gradient
    purple: ['#8B5CF6', '#A78BFA'],      // Purple gradient
    blue: ['#0EA5E9', '#38BDF8'],        // Blue gradient
  },

  // Arka Planlar
  background: '#F8FAFC',     // Çok açık Slate arka plan
  backgroundLight: '#FFFFFF',
  backgroundGray: '#F1F5F9',
  cardBackground: '#FFFFFF',
  cardBackgroundHover: '#F8FAFC',
  inputBackground: '#F1F5F9',
  chipBackground: '#E2E8F0',
  chipSelected: '#0EA5E9',

  // Metin Renkleri
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  textWhite: '#FFFFFF',
  textLabel: '#64748B',
  textLink: '#0EA5E9',

  // Kenarlık
  borderLight: '#E2E8F0',
  borderMedium: '#CBD5E1',
  borderDark: '#94A3B8',

  // Gölge
  shadow: '#000000',
  shadowLight: 'rgba(15, 23, 42, 0.04)',
  shadowMedium: 'rgba(15, 23, 42, 0.08)',
  shadowDark: 'rgba(15, 23, 42, 0.12)',

  overlay: 'rgba(15, 23, 42, 0.4)',
  overlayLight: 'rgba(15, 23, 42, 0.1)',
};

// Profesyonel Shadow Preset'leri - Yumuşak ve Minimalist
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xlarge: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Profesyonel Border Radius Preset'leri - iOS tarzı
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999,
};

// Spacing Preset'leri - Daha Geniş ve Düzenli
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  // Özel spacing'ler
  screenPadding: 20, // Ekran kenar boşluğu
  cardPadding: 16, // Kart içi padding
  sectionSpacing: 24, // Bölümler arası boşluk
};

export default colors;
