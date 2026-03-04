import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, spacing, shadows } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre boş bırakılamaz.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Kırmızı üst bölüm - Logo */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top']}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🤰</Text>
            <Text style={styles.appName}>MomyCare</Text>
            <Text style={styles.appSubtitle}>Sağlık Takip Uygulaması</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Beyaz giriş kartı */}
      <KeyboardAvoidingView
        style={styles.bottomSection}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Giriş</Text>

            {/* Kullanıcı Adı */}
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>👤</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Kullanıcı adınızı girin"
                    placeholderTextColor={colors.textTertiary}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.divider} />

              {/* Şifre */}
              <View style={styles.inputRow}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.inputIcon}>{showPassword ? '👁️' : '🔒'}</Text>
                </TouchableOpacity>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Şifre</Text>
                  <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor={colors.textTertiary}
                    secureTextEntry={!showPassword}
                  />
                </View>
              </View>
            </View>

            {/* Giriş Butonu */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Giriş Yapılıyor...' : 'GİRİŞ'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topSection: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  logoEmoji: {
    fontSize: 88,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  bottomSection: {
    flex: 1.2,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loginCard: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingBottom: spacing.sm,
    alignSelf: 'flex-start',
    paddingRight: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: spacing.md,
    width: 28,
    textAlign: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  textInput: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
    paddingVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 60,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadows.medium,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: 1.5,
  },
});

export default LoginScreen;
