import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

// --- MOCK DATA THÔNG BÁO ---
const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    category: 'transaction',
    typeLabel: 'Nạp tiền',
    title: 'Nạp tiền thành công',
    message: 'Số tiền 100.000đ đã được nạp vào tài khoản của bạn.',
    time: '23 phút trước',
    isRead: true,
    icon: 'cash',
    iconColor: '#10B981', // Xanh lá
  },
  {
    id: '2',
    category: 'system',
    typeLabel: 'Swift247',
    title: 'Đơn hàng đã giao',
    message: 'Đơn hàng của bạn đã được giao thành công.',
    time: '23 phút trước',
    isRead: true,
    icon: 'bullhorn',
    iconColor: '#EF4444', // Đỏ
  },
  {
    id: '3',
    category: 'transaction',
    typeLabel: 'Nạp tiền',
    title: 'Nạp tiền thành công',
    message: 'Số tiền 500.000đ đã được nạp vào tài khoản của bạn.',
    time: '23 phút trước',
    isRead: false, // Chưa đọc -> Nền hồng
    icon: 'cash',
    iconColor: '#10B981',
  },
  {
    id: '4',
    category: 'promotion',
    typeLabel: 'Ưu đãi',
    title: 'Tặng bạn mã giảm 40k',
    message: 'Bạn đã nhận được mã giảm giá 40.000đ cho đơn hàng tiếp theo.',
    time: '23 phút trước',
    isRead: true,
    icon: 'brightness-percent',
    iconColor: '#F59E0B', // Vàng cam
  },
];

const TABS = ['Tất cả', 'Ưu đãi', 'Giao dịch', 'Chưa đọc'];

export default function NotificationsScreen() {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('Tất cả');

  // Xử lý Lọc Thông báo
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'Tất cả') return true;
    if (activeTab === 'Ưu đãi') return notif.category === 'promotion';
    if (activeTab === 'Giao dịch') return notif.category === 'transaction';
    if (activeTab === 'Chưa đọc') return !notif.isRead;
    return true;
  });

  // Nút "Đọc tất cả"
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Hàm Xóa Thông Báo
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Giao diện Nút Xóa (Hiển thị khi vuốt sang trái)
  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteActionBtn}
        onPress={() => deleteNotification(id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
        <Text style={styles.deleteActionText}>Xóa</Text>
      </TouchableOpacity>
    );
  };

  // Render từng thẻ Thông báo (Đã bọc thêm Swipeable)
  const renderNotificationItem = ({ item }: { item: typeof INITIAL_NOTIFICATIONS[0] }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      containerStyle={styles.swipeableContainer}
    >
      <TouchableOpacity 
        style={[styles.notificationCard, !item.isRead && styles.notificationCardUnread]}
        activeOpacity={1} // Để 1 để không bị nháy nháy khi đang vuốt
      >
        {/* Tiêu đề nhỏ (Header của thẻ) */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardHeaderLeft}>
            <MaterialCommunityIcons name={item.icon as any} size={18} color={item.iconColor} />
            <Text style={styles.typeLabel}>{item.typeLabel}</Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {/* Nội dung chính */}
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D82D59" />

      {/* HEADER ĐỎ */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity style={styles.readAllBtn} onPress={markAllAsRead}>
          <Text style={styles.readAllText}>Đọc tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* CÁC TABS (BỘ LỌC) */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DANH SÁCH HOẶC TRẠNG THÁI TRỐNG */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          {/* Biểu tượng chiếc chuông ngủ */}
          <View style={styles.emptyIllustration}>
            <View style={styles.bellBackground}>
              <Ionicons name="notifications" size={60} color="#FCA5A5" />
            </View>
            <Text style={styles.zzzText1}>z</Text>
            <Text style={styles.zzzText2}>z</Text>
            <Text style={styles.zzzText3}>Z</Text>
          </View>
          <Text style={styles.emptyStateText}>Chưa có thông báo mới</Text>
        </View>
      )}

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  /* HEADER */
  header: {
    backgroundColor: '#D82D59',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  readAllBtn: {
    width: 60,
    alignItems: 'flex-end',
  },
  readAllText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
  },

  /* BỘ LỌC TABS */
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabItemActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D82D59',
  },
  tabText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#D82D59',
  },

  /* DANH SÁCH THÔNG BÁO VÀ SWIPEABLE */
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  swipeableContainer: {
    marginBottom: 12, // Dời MarginBottom từ card ra ngoài Container của Swipe
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationCardUnread: {
    backgroundColor: '#FDF2F8', 
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 6,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginLeft: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },

  /* NÚT XÓA KHI VUỐT */
  deleteActionBtn: {
    backgroundColor: '#9D275D', // Màu đỏ sẫm giống ảnh mẫu
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },

  /* TRẠNG THÁI TRỐNG (EMPTY STATE) */
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyIllustration: {
    position: 'relative',
    marginBottom: 20,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zzzText1: { position: 'absolute', top: 10, right: 30, fontSize: 12, color: '#FCA5A5', fontWeight: 'bold' },
  zzzText2: { position: 'absolute', top: -5, right: 15, fontSize: 16, color: '#FCA5A5', fontWeight: 'bold' },
  zzzText3: { position: 'absolute', top: -25, right: 0, fontSize: 22, color: '#FCA5A5', fontWeight: 'bold' },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});