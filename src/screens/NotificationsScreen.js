import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, borderRadius, spacing } from '../constants/colors';
import ErrorState from '../components/ErrorState';

const NotificationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          title: 'Kan Şekeri Ölçüm Hatırlatıcısı',
          message: 'Sabah ölçümünüzü yapmayı unutmayın!',
          time: '08:00',
          date: 'Bugün',
          read: false,
          type: 'reminder',
        },
        {
          id: '2',
          title: 'Egzersiz Zamanı',
          message: 'Günlük 30 dakikalık yürüyüşünüzü yapmayı unutmayın.',
          time: '14:00',
          date: 'Bugün',
          read: false,
          type: 'activity',
        },
        {
          id: '3',
          title: 'Doktor Randevusu',
          message: 'Yarın saat 10:00\'da doktor kontrolünüz var.',
          time: '10:00',
          date: 'Yarın',
          read: true,
          type: 'appointment',
        },
        {
          id: '4',
          title: 'İlaç Hatırlatıcısı',
          message: 'İnsülin dozunuzu almayı unutmayın.',
          time: '18:00',
          date: 'Dün',
          read: true,
          type: 'medication',
        },
      ]);
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return '🩸';
      case 'activity':
        return '🏃';
      case 'appointment':
        return '📅';
      case 'medication':
        return '💊';
      default:
        return '🔔';
    }
  };

  const getNotificationGradient = (type) => {
    switch (type) {
      case 'reminder':
        return colors.gradients.primary;
      case 'activity':
        return colors.gradients.accent;
      case 'appointment':
        return colors.gradients.secondary;
      case 'medication':
        return colors.gradients.success;
      default:
        return colors.gradients.primary;
    }
  };

  if (loading) {
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
            <Text style={styles.headerTitle}>Bildirimler</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.textWhite} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

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
            <Text style={styles.headerTitle}>Bildirimler</Text>
            <Text style={styles.headerSubtitle}>
              {unreadCount > 0 ? `${unreadCount} okunmamış` : 'Tümü okundu'}
            </Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.notificationsContainer,
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
                <Text style={styles.mainIcon}>😲</Text>
              </LinearGradient>
            </View>

            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Henüz bildiriminiz yok</Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.unreadCard,
                  ]}
                  onPress={() => markAsRead(notification.id)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={
                      notification.read
                        ? ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']
                        : ['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']
                    }
                    style={styles.cardGradient}
                  >
                    <View style={styles.notificationContent}>
                      <LinearGradient
                        colors={getNotificationGradient(notification.type)}
                        style={styles.notificationIcon}
                      >
                        <Text style={styles.iconEmoji}>
                          {getNotificationIcon(notification.type)}
                        </Text>
                      </LinearGradient>
                      <View style={styles.notificationTextContainer}>
                        <View style={styles.notificationHeader}>
                          <Text style={styles.notificationTitle}>
                            {notification.title}
                          </Text>
                          {!notification.read && (
                            <View style={styles.unreadDot} />
                          )}
                        </View>
                        <Text style={styles.notificationMessage}>
                          {notification.message}
                        </Text>
                        <View style={styles.notificationFooter}>
                          <Text style={styles.notificationTime}>
                            {notification.date} {notification.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
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
  badge: {
    backgroundColor: colors.gradients.accent[0],
    borderRadius: borderRadius.full,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    ...shadows.medium,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  notificationsContainer: {
    gap: spacing.md,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '600',
  },
  notificationCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.gradients.secondary[0],
  },
  cardGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  notificationContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  notificationIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  iconEmoji: {
    fontSize: 28,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gradients.secondary[0],
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '600',
  },
});

export default NotificationsScreen;
