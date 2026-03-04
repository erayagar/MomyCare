import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ModernButton from '../components/ModernButton';

const WhatsappEmergencyScreen = ({ navigation }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const emergencyContacts = [
    {
      id: '1',
      name: 'Doktor Ahmet Yılmaz',
      phone: '+905551234567',
      role: 'Kadın Doğum Uzmanı',
      available: '24/7',
      gradient: colors.gradients.primary,
    },
    {
      id: '2',
      name: 'Diyetisyen Ayşe Demir',
      phone: '+905559876543',
      role: 'Beslenme Uzmanı',
      available: '09:00 - 18:00',
      gradient: colors.gradients.success,
    },
    {
      id: '3',
      name: 'Acil Servis',
      phone: '+905321123456',
      role: 'Acil Tıbbi Yardım',
      available: '24/7',
      gradient: colors.gradients.accent,
    },
  ];

  const openWhatsApp = (phone) => {
    const url = `whatsapp://send?phone=${phone.replace(/[^0-9]/g, '')}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            'WhatsApp Bulunamadı',
            'Lütfen telefonunuzda WhatsApp uygulamasının yüklü olduğundan emin olun.'
          );
        }
      })
      .catch((err) => {
        Alert.alert('Hata', 'WhatsApp açılırken bir hata oluştu.');
      });
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>WhatsApp Acil</Text>
            <Text style={styles.headerSubtitle}>Acil durum iletişimi</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={colors.gradients.accent}
                style={styles.iconGradient}
              >
                <Text style={styles.mainIcon}>📅</Text>
              </LinearGradient>
            </View>

            <View style={styles.descriptionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                style={styles.descriptionGradient}
              >
                <Text style={styles.description}>
                  Acil durumlarda iletişime geçebileceğiniz sağlık uzmanları ve acil servis bilgileri.
                </Text>
              </LinearGradient>
            </View>

            {/* Modern Warning Card */}
            <View style={styles.warningCard}>
              <LinearGradient
                colors={colors.gradients.accent}
                style={styles.warningGradient}
              >
                <Text style={styles.warningTitle}>⚠️ Acil Durum</Text>
                <Text style={styles.warningText}>
                  Ciddi bir sağlık sorunu yaşıyorsanız, önce 112 Acil Servis'i arayın.
                </Text>
              </LinearGradient>
            </View>

            {emergencyContacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.contactGradient}
                >
                  <View style={styles.contactHeader}>
                    <LinearGradient
                      colors={contact.gradient}
                      style={styles.contactIcon}
                    >
                      <Text style={styles.contactEmoji}>
                        {contact.id === '3' ? '🚑' : '👨‍⚕️'}
                      </Text>
                    </LinearGradient>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactRole}>{contact.role}</Text>
                      <View style={styles.availableContainer}>
                        <View style={styles.availableDot} />
                        <Text style={styles.contactAvailable}>
                          Müsaitlik: {contact.available}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={styles.whatsappButton}
                      onPress={() => openWhatsApp(contact.phone)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={['#25D366', '#128C7E']}
                        style={styles.actionButtonGradient}
                      >
                        <Text style={styles.whatsappIcon}>💬</Text>
                        <Text style={styles.actionButtonText}>WhatsApp</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => handleCall(contact.phone)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={colors.gradients.secondary}
                        style={styles.actionButtonGradient}
                      >
                        <Text style={styles.callIcon}>📞</Text>
                        <Text style={styles.actionButtonText}>Ara</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ))}

            {/* Modern Info Card */}
            <View style={styles.infoCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                style={styles.infoCardGradient}
              >
                <Text style={styles.infoTitle}>Önemli Notlar</Text>
                <View style={styles.infoList}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>Acil durumlarda önce 112'yi arayın</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>WhatsApp mesajları anında yanıtlanmayabilir</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>Rutin sorularınız için randevu alın</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>İlaç dozları hakkında doktorunuza danışın</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backIcon: {
    fontSize: 20,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  content: {
    gap: spacing.md,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
  },
  mainIcon: {
    fontSize: 48,
  },
  descriptionCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  descriptionGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  description: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  warningCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  warningGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 3,
    borderColor: colors.gradients.accent[0],
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textWhite,
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  warningText: {
    fontSize: 14,
    color: colors.textWhite,
    lineHeight: 22,
    fontWeight: '600',
  },
  contactCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  contactGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  contactHeader: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  contactIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    ...shadows.medium,
  },
  contactEmoji: {
    fontSize: 32,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    letterSpacing: -0.3,
  },
  contactRole: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  availableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gradients.success[0],
  },
  contactAvailable: {
    fontSize: 12,
    color: colors.gradients.success[0],
    fontWeight: '700',
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  callButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  whatsappIcon: {
    fontSize: 20,
  },
  callIcon: {
    fontSize: 20,
  },
  actionButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '800',
  },
  infoCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginTop: spacing.md,
    ...shadows.large,
  },
  infoCardGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  infoList: {
    gap: spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBullet: {
    fontSize: 18,
    color: colors.gradients.primary[0],
    fontWeight: '800',
    marginRight: spacing.sm,
    marginTop: -2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default WhatsappEmergencyScreen;
