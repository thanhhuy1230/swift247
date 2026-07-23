import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// Giả sử Colors.white vẫn là trắng. Nếu Colors.primary là xanh, ta sẽ thay bằng mã màu hồng trực tiếp
import { Colors } from '../../constants/Colors';

// Định nghĩa màu hồng chủ đạo cục bộ nếu Colors.primary chưa đổi sang hồng
const PINK_PRIMARY = '#EC4899'; // Hồng đậm (Pink 500)
const PINK_DARK = '#DB2777';    // Hồng sẫm hơn (Pink 600)
const PINK_LIGHT = '#FCE7F3';   // Hồng rất nhạt (Pink 100)

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('shipping');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Đổi màu StatusBar sang hồng */}
      <StatusBar barStyle="light-content" backgroundColor={PINK_PRIMARY} />

      {/* Header tiêu đề - Nền hồng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quản lý Đơn hàng</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Thanh tìm kiếm - Nền hồng */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Tìm kiếm theo mã AWB hoặc tuyến đường..." 
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Thanh chọn trạng thái */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'shipping' && styles.activeTabButton]}
          onPress={() => setActiveTab('shipping')}
        >
          <Text style={[styles.tabText, activeTab === 'shipping' && styles.activeTabText]}>Đang giao</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'completed' && styles.activeTabButton]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách đơn hàng */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {activeTab === 'shipping' ? (
          <>
            {/* Card Đang giao 1 */}
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#SW247-8932</Text>
                {/* Badge màu cam giữ nguyên để cảnh báo, hoặc đổi sang hồng đậm tùy bạn. Ở đây giữ nguyên vì nó hợp lý cho trạng thái 'đang đi' */}
                <View style={styles.statusBadgeShipping}>
                  <Text style={styles.statusTextShipping}>Đang vận chuyển</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                {/* Chấm tròn màu hồng */}
                <View style={styles.routeDotPrimary} />
                <Text style={styles.routeText}>Sân bay Tân Sơn Nhất</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeContainer}>
                <View style={styles.routeDotGray} />
                <Text style={styles.routeText}>Kho Nội Bài, Hà Nội</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.serviceType}>Dịch vụ: Siêu tốc (&lt;6h)</Text>
                
                <TouchableOpacity 
                  style={styles.detailButton}
                  onPress={() => router.push('/order-detail')}
                >
                  <Text style={styles.detailButtonText}>Chi tiết</Text>
                  {/* Icon màu hồng */}
                  <Ionicons name="chevron-forward" size={14} color={PINK_PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Card Đang giao 2 */}
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#SW247-8890</Text>
                <View style={styles.statusBadgeShipping}>
                  <Text style={styles.statusTextShipping}>Đang vận chuyển</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routeDotPrimary} />
                <Text style={styles.routeText}>Bưu cục Đà Nẵng</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeContainer}>
                <View style={styles.routeDotGray} />
                <Text style={styles.routeText}>Quận 1, TP. Hồ Chí Minh</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.serviceType}>Dịch vụ: Chuyển phát nhanh (&lt;24h)</Text>
                <TouchableOpacity 
                  style={styles.detailButton}
                  onPress={() => router.push('/order-detail')}
                >
                  <Text style={styles.detailButtonText}>Chi tiết</Text>
                  <Ionicons name="chevron-forward" size={14} color={PINK_PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>
          </  >
        ) : (
          <>
            {/* Card Hoàn thành mẫu */}
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#SW247-7521</Text>
                {/* Badge hoàn thành xanh lá cây giữ nguyên vì đây là màu quy ước chuẩn cho 'thành công', giúp user dễ phân biệt hơn là tất cả đều hồng */}
                <View style={styles.statusBadgeCompleted}>
                  <Text style={styles.statusTextCompleted}>Đã giao hàng</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routeDotGray} />
                <Text style={styles.routeText}>Hà Nội</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeContainer}>
                <View style={styles.routeDotPrimary} />
                <Text style={styles.routeText}>Hải Phòng</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.serviceType}>Dịch vụ: Chuyển phát nhanh (&lt;24h)</Text>
                <TouchableOpacity 
                  style={styles.detailButton}
                  onPress={() => router.push('/order-detail')} // Thường hoàn thành thì xem chi tiết/biên nhận
                >
                  <Text style={styles.detailButtonText}>Xem biên nhận</Text>
                  <Ionicons name="chevron-forward" size={14} color={PINK_PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

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
    backgroundColor: PINK_PRIMARY, // Đổi sang Hồng
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Giữ độ trong suốt trên nền hồng
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    backgroundColor: PINK_PRIMARY, // Đổi sang Hồng
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: PINK_LIGHT, // Nền hồng nhạt cho tab active
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: PINK_DARK, // Chữ hồng đậm cho tab active
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    gap: 16,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  statusBadgeShipping: {
    backgroundColor: '#FEF3C7', // Giữ màu cam nhạt
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextShipping: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706', // Giữ màu cam đậm
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5', // Giữ màu xanh lá nhạt
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextCompleted: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669', // Giữ màu xanh lá đậm
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  routeDotPrimary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PINK_PRIMARY, // Đổi chấm tròn sang Hồng
  },
  routeDotGray: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9CA3AF',
  },
  routeLine: {
    width: 2,
    height: 14,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
    marginVertical: 2,
  },
  routeText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  serviceType: {
    fontSize: 13,
    color: '#6B7280',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: PINK_PRIMARY, // Chữ nút màu Hồng
  },
});