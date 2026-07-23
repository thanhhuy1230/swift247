import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';


const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Nút Bỏ qua ở góc trên (Chuẩn UX ứng dụng hiện đại) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* Khu vực Hero Illustration / Logo trung tâm */}
      <View style={styles.heroSection}>
        <View style={styles.glowEffect} />
        <View style={styles.logoCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="rocket-sharp" size={64} color={Colors.white} />
          </View>
          <Text style={styles.brandBadge}>SWIFT247 LOGISTICS</Text>
        </View>
      </View>

      {/* Khu vực nội dung chữ */}
      <View style={styles.contentSection}>
        <View style={styles.indicatorContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.title}>Vận chuyển siêu tốc,{"\n"}Kết nối toàn cầu</Text>
        <Text style={styles.subtitle}>
          Giải pháp logistics thông minh tích hợp đường hàng không và đường bộ. Theo dõi đơn hàng theo thời gian thực 24/7.
        </Text>
      </View>

      {/* Khu vực nút bấm hành động */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.primaryButtonText}>Bắt đầu ngay</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => console.log('Đăng ký tài khoản')}
        >
          <Text style={styles.secondaryButtonText}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  skipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  glowEffect: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(224, 43, 32, 0.08)',
  },
  logoCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 130,
    height: 130,
    borderRadius: 36, // Bo góc kiểu iOS hiện đại (Squircle)
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  brandBadge: {
    marginTop: 24,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.primary,
  },
  contentSection: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});