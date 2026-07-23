import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PINK_PRIMARY = '#EC4899';
const PINK_LIGHT_ABAR = 'rgba(236, 72, 153, 0.2)';
const WHITE = '#FFFFFF';

export default function OrderDetailScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PINK_PRIMARY} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết Vận đơn</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.orderIdLabel}>Mã vận đơn</Text>
            <Text style={styles.orderIdText}>SW247-8932</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dịch vụ</Text>
            <Text style={styles.summaryValue}>Siêu tốc (&lt;6h)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Trạng thái</Text>
            <Text style={[styles.summaryValue, { color: '#D97706' }]}>Đang vận chuyển</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dự kiến giao</Text>
            <Text style={styles.summaryValue}>18:00 - Hôm nay</Text>
          </View>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Lộ trình đơn hàng</Text>
          <View style={styles.timelineCard}>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <View style={styles.activeDot} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitleActive}>Đang vận chuyển đến trạm trung chuyển</Text>
                <Text style={styles.timelineDesc}>Tài xế đang di chuyển đến Kho Nội Bài, Hà Nội</Text>
                <Text style={styles.timelineTime}>15:30 - Hôm nay</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <View style={styles.inactiveDot} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Đã đến Sân bay Tân Sơn Nhất</Text>
                <Text style={styles.timelineDesc}>Đơn hàng đã được kiểm tra an ninh và phân loại.</Text>
                <Text style={styles.timelineTime}>13:15 - Hôm nay</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <View style={styles.inactiveDot} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Lấy hàng thành công</Text>
                <Text style={styles.timelineDesc}>Nhân viên đã lấy hàng từ người gửi.</Text>
                <Text style={styles.timelineTime}>09:00 - Hôm nay</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <View style={styles.inactiveDot} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Đơn hàng được tạo</Text>
                <Text style={styles.timelineDesc}>Người gửi đã bàn giao thông tin đơn hàng cho hệ thống.</Text>
                <Text style={styles.timelineTime}>08:30 - Hôm nay</Text>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: PINK_PRIMARY,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: WHITE,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: '800',
    color: PINK_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  timelineSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  timelineCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineIconContainer: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  activeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PINK_PRIMARY,
    borderWidth: 4,
    borderColor: PINK_LIGHT_ABAR,
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
    minHeight: 40,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineTitleActive: {
    fontSize: 15,
    fontWeight: '700',
    color: PINK_PRIMARY,
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 6,
  },
  timelineTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});