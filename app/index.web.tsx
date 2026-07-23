import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const PINK_PRIMARY = '#B94A6E';

export default function WebHomeScreen() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* ================= HEADER THANH ĐIỀU HƯỚNG ================= */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SWIFT247</Text>
        </View>
        
        <View style={styles.navLinks}>
          <TouchableOpacity><Text style={styles.navTextActive}>Trang chủ</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/locations')}><Text style={styles.navText}>Danh sách bưu cục</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/address')}><Text style={styles.navText}>Sổ địa chỉ</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Dịch vụ</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Tin tức</Text></TouchableOpacity>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/booking')}>
            <Text style={styles.loginBtnText}>Đăng nhập / Đặt đơn</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= BANNER CHÍNH & KHỐI TRA CỨU ĐƠN HÀNG ================= */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop' }} 
        style={styles.heroBanner}
      >
        <View style={styles.heroOverlay}>
          
          {/* Hộp Tra cứu đơn hàng (Tracking Box giống mẫu) */}
          <View style={styles.trackingCard}>
            <Text style={styles.trackingCardTitle}>Tra cứu đơn hàng</Text>
            <Text style={styles.trackingCardSub}>Nhập mã vận đơn của bạn</Text>
            
            <TextInput 
              style={styles.trackingInput} 
              placeholder="VD: SWIFT123456" 
              placeholderTextColor="#9CA3AF"
              value={trackingCode}
              onChangeText={setTrackingCode}
            />

            <TouchableOpacity 
              style={styles.trackingBtn}
              onPress={() => router.push('/booking')}
            >
              <Text style={styles.trackingBtnText}>Tra cứu</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>

      {/* ================= PHẦN DỊCH VỤ CỦA CHÚNG TÔI ================= */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionMainTitle}>DỊCH VỤ CỦA CHÚNG TÔI</Text>
        
        <View style={styles.serviceCardsRow}>
          <TouchableOpacity style={styles.serviceCardItem} onPress={() => router.push('/booking')}>
            <Ionicons name="gift-outline" size={32} color={PINK_PRIMARY} />
            <Text style={styles.serviceCardTitle}>Giao Hỏa Tốc (24H)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCardItem} onPress={() => router.push('/booking')}>
            <Ionicons name="rocket-outline" size={32} color={PINK_PRIMARY} />
            <Text style={styles.serviceCardTitle}>Giao Nhanh Tiêu Chuẩn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCardItem} onPress={() => router.push('/locations')}>
            <Ionicons name="business-outline" size={32} color={PINK_PRIMARY} />
            <Text style={styles.serviceCardTitle}>Mạng Lưới Bưu Cục</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= PHẦN TÍNH NĂNG NỔI BẬT ================= */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionMainTitle}>NHỮNG TÍNH NĂNG NỔI BẬT</Text>
        
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark-outline" size={28} color={PINK_PRIMARY} />
            <Text style={styles.featureTitle}>Bảo hiểm hàng hóa 100%</Text>
            <Text style={styles.featureDesc}>Cam kết đền bù thỏa đáng nếu xảy ra sự cố thất lạc hay hư hỏng.</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="time-outline" size={28} color={PINK_PRIMARY} />
            <Text style={styles.featureTitle}>Cập nhật thời gian thực</Text>
            <Text style={styles.featureDesc}>Theo dõi sát sao hành trình vận chuyển kiện hàng 24/7 trên hệ thống.</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="wallet-outline" size={28} color={PINK_PRIMARY} />
            <Text style={styles.featureTitle}>Cước phí tối ưu</Text>
            <Text style={styles.featureDesc}>Nhiều gói ưu đãi và chiết khấu hấp dẫn dành cho khách hàng thường xuyên.</Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 SWIFT247 Logistics. All rights reserved.</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  /* HEADER */
  header: {
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    elevation: 2,
  },
  logoContainer: {},
  logoText: { fontSize: 22, fontWeight: '900', color: PINK_PRIMARY, letterSpacing: 1 },
  navLinks: { flexDirection: 'row', gap: 30 },
  navText: { fontSize: 15, fontWeight: '600', color: '#4B5563' },
  navTextActive: { fontSize: 15, fontWeight: '700', color: PINK_PRIMARY },
  headerActions: {},
  loginBtn: { backgroundColor: PINK_PRIMARY, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  loginBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },

  /* HERO BANNER & TRACKING BOX */
  heroBanner: {
    height: 480,
    width: '100%',
    justifyContent: 'center',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 80,
    justifyContent: 'center',
  },
  trackingCard: {
    width: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  trackingCardTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  trackingCardSub: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
  trackingInput: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 14,
  },
  trackingBtn: {
    backgroundColor: PINK_PRIMARY,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  /* DỊCH VỤ */
  sectionContainer: { paddingVertical: 50, paddingHorizontal: 80, alignItems: 'center' },
  sectionMainTitle: { fontSize: 20, fontWeight: '900', color: '#1F2937', marginBottom: 30, letterSpacing: 0.5 },
  serviceCardsRow: { flexDirection: 'row', gap: 24, width: '100%', justifyContent: 'center' },
  serviceCardItem: {
    flex: 1,
    maxWidth: 280,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 2,
  },
  serviceCardTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginTop: 12, textAlign: 'center' },

  /* TÍNH NĂNG NỔI BẬT */
  featuresSection: { paddingVertical: 40, paddingHorizontal: 80, alignItems: 'center', backgroundColor: '#FFFFFF' },
  featuresGrid: { flexDirection: 'row', gap: 30, width: '100%', justifyContent: 'center' },
  featureItem: {
    flex: 1,
    maxWidth: 320,
    padding: 20,
  },
  featureTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginTop: 12, marginBottom: 8 },
  featureDesc: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  /* FOOTER */
  footer: {
    backgroundColor: '#1F2937',
    padding: 30,
    alignItems: 'center',
  },
  footerText: { color: '#9CA3AF', fontSize: 13 },
});