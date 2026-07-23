import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Bật LayoutAnimation cho Android để Sidebar mượt mà
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- MOCK DATA ---
const MAIN_SERVICES = [
  { id: 1, title: 'Giao hàng\ntiêu chuẩn', icon: 'gift' },
  { id: 2, title: 'Giao hàng\nnhanh', icon: 'crown' },
  { id: 3, title: 'Giao hàng\nsiêu tốc', icon: 'rocket' },
  { id: 4, title: 'Giao hàng\ntải lớn', icon: 'truck-delivery' },
];

const VOUCHERS = [
  { id: 1, title: 'Voucher x3', discount: '50%', max: 'Tối đa 30k', date: 'Đến ngày 12/01/2022', type: 'use' },
  { id: 2, title: 'Voucher x3', discount: '50%', max: 'Tối đa 30k', date: 'Đến ngày 12/01/2022', type: 'collect' },
];

const UPDATE_DATA = [
  { id: 1, title: 'Mừng tháng tri ân', desc: 'Kiện hàng của bạn đã được giao\nthành công', color: '#FCD34D', mockText: 'Đã đến\nkhách hàng' },
  { id: 2, title: 'Mừng tháng tri ân', desc: 'Kiện hàng của bạn đã được giao\nthành công', color: '#C084FC', mockText: 'THÁNG 5\nDEAL NGÚT NGÀN' },
  { id: 3, title: 'Mừng tháng tri ân', desc: 'Kiện hàng của bạn đã được giao\nthành công', color: '#FCA5A5', mockText: 'SWIFT SHIPPING\nTO THE MINUTE' },
];

const SERVICE_BANNERS = [
  { id: 1, title: 'Giao hàng siêu hỏa tốc', color: '#FCA5A5', mockText: 'Giao hàng\nsiêu hỏa tốc\nđã quay\ntrở lại' },
  { id: 2, title: 'Dịch vụ giao thư từ phút chót', color: '#F43F5E', mockText: 'Super\nSwift 247' },
];

const NEWS_DATA = [
  { id: 1, title: 'Mừng Tháng Tri Ân - Giao Hàng Thả Ga', date: '2 thg 11 2021', color: '#EF4444', tag: 'N50 50K' },
  { id: 2, title: 'Happy Day 70%', date: '12 thg 11 2022', color: '#0EA5E9', tag: 'GIẢM 50%' },
  { id: 3, title: 'Gói Siêu Ưu Đãi - Ship Nhiều Chẳng Lo', date: '12 thg 11 2022', color: '#3B82F6', tag: 'LOVESWIFT' },
  { id: 4, title: 'Ưu Đãi Bạn Mới Lên Đến 50%', date: '2 thg 11 2021', color: '#A855F7', tag: 'BẠN MỚI 50' },
];

const SIDEBAR_MENU = [
  { id: 'about', title: 'Về chúng tôi', icon: 'information-circle-outline' },
  { id: 'services', title: 'Dịch vụ', icon: 'cube-outline', subItems: ['Thông giải dịch vụ', 'Chuyển phát nhanh', 'Quốc tế'] },
  { id: 'locations', title: 'Danh sách bưu cục', icon: 'business-outline' },
  { id: 'pricing', title: 'Bảng giá', icon: 'cash-outline' },
  { id: 'news', title: 'Tin tức', icon: 'newspaper-outline', subItems: ['Tin tức', 'Khuyến mãi', 'Tuyển dụng'] },
  { id: 'support', title: 'Hỗ trợ', icon: 'headset-outline' },
];

export default function HomeScreen() {
  const router = useRouter();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubMenu = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const SectionHeader = ({ title, showSeeAll = true, onPress }: { title: string; showSeeAll?: boolean; onPress?: () => void }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.seeAllText}>Xem thêm</Text>
          <Ionicons name="chevron-forward" size={16} color="#D82D59" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D82D59" />

      {/* ================= BẮT ĐẦU KHU VỰC CUỘN ================= */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} bounces={false}>
        
        {/* === HEADER ĐỎ VÀ BANNER KHUYẾN MÃI === */}
        <View style={styles.headerRedArea}>
          {/* Hàng Icon (Menu & Thông báo) */}
          <View style={styles.topHeaderRow}>
            <View style={{ flex: 1 }} />
            <View style={styles.headerRightControls}>
              <TouchableOpacity style={styles.headerIconBtn} onPress={() => setIsMenuOpen(true)}>
                <Ionicons name="menu" size={24} color="#D82D59" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerIconBtn} 
                onPress={() => router.push('/notifications')}
              >
                <Ionicons name="notifications" size={20} color="#D82D59" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Khối Banner Khuyến Mãi */}
          <View style={styles.bannerContainer}>
            <Text style={styles.bannerSubTitle}>MÃ KHUYẾN MÃI</Text>
            <View style={styles.bannerCodeBox}>
              <View style={styles.bannerCodeLeft}>
                <Text style={styles.bannerCodeText}>NEWYS247</Text>
              </View>
              <View style={styles.bannerCodeRight}>
                <Text style={styles.bannerDiscount}>50%</Text>
              </View>
            </View>
            <Text style={styles.bannerDesc}>*Áp dụng cho tất cả các đơn hàng (Tất cả các ngày trong tuần từ T2 đến CN)</Text>
          </View>
        </View>

        {/* THANH TÌM KIẾM NỔI */}
        <TouchableOpacity style={styles.floatingSearchBar} onPress={() => router.push('/booking')} activeOpacity={0.9}>
          <View style={styles.searchInner}>
            <Ionicons name="location-sharp" size={24} color="#D82D59" />
            <Text style={styles.searchText}>Gửi hàng giá trị cao</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* ================= PHẦN NỘI DUNG NỀN SÁNG ================= */}
        <View style={styles.scrollBodyBackground}>
          
          {/* 4 DỊCH VỤ CHÍNH */}
          <View style={styles.mainServicesRow}>
            {MAIN_SERVICES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.serviceIconWrap} onPress={() => router.push('/booking')}>
                <MaterialCommunityIcons 
                  name={item.icon as any} 
                  size={38} 
                  color="#D65A73" 
                  style={{ marginBottom: 8 }} 
                />
                <Text style={styles.serviceIconText} numberOfLines={2}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.thickDivider} />

          {/* ƯU ĐÃI CỦA TÔI */}
          <View style={styles.sectionContainer}>
            <SectionHeader title="Ưu đãi của tôi" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {VOUCHERS.map((voucher) => (
                <View key={voucher.id} style={styles.voucherCard}>
                  <View style={styles.voucherLeft}>
                    <Text style={styles.voucherLeftTitle}>{voucher.title}</Text>
                  </View>
                  <View style={styles.voucherDashLine}>
                    <View style={styles.cutoutTop} />
                    <View style={styles.cutoutBottom} />
                  </View>
                  <View style={styles.voucherRight}>
                    <Text style={styles.voucherDiscount}>{voucher.discount} <Text style={styles.voucherMax}>({voucher.max})</Text></Text>
                    <Text style={styles.voucherDate}>{voucher.date}</Text>
                    <TouchableOpacity style={[styles.voucherBtn, voucher.type === 'collect' && styles.voucherBtnOutlined]}>
                      <Text style={[styles.voucherBtnText, voucher.type === 'collect' && styles.voucherBtnTextOutlined]}>
                        {voucher.type === 'use' ? 'Sử dụng ngay' : 'Thu thập'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* ĐƠN HÀNG CỦA TÔI */}
          <View style={styles.sectionContainer}>
            <SectionHeader title="Đơn hàng của tôi" />
            <TouchableOpacity style={styles.orderCard} onPress={() => router.push('/orders')} activeOpacity={0.8}>
              <View style={styles.orderHeaderRow}>
                <Text style={styles.orderStatus}>Hàng đã giao</Text>
                <View style={styles.orderTimeRow}>
                  <Text style={styles.orderTimeText}>9h 53p 11 thg 12</Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </View>
              </View>
              <View style={styles.orderContentRow}>
                <View style={styles.orderIconBox}>
                  <Ionicons name="cube" size={20} color="#D82D59" />
                </View>
                <Text style={styles.orderDescText}>Kiện hàng của bạn đã được giao thành công</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* CẬP NHẬT MỚI */}
          <View style={styles.sectionContainer}>
            <SectionHeader title="Cập nhật mới" showSeeAll={false} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {UPDATE_DATA.map((item) => (
                <View key={item.id} style={styles.updateCard}>
                  <View style={[styles.imagePlaceholder, { backgroundColor: item.color }]}>
                    <Text style={styles.mockImgTextUpdate}>{item.mockText}</Text>
                  </View>
                  <View style={styles.updateCardContent}>
                    <View style={styles.updateTextWrap}>
                      <Text style={styles.updateTitle} numberOfLines={1}>{item.title}</Text>
                      <Text style={styles.updateDesc} numberOfLines={2}>{item.desc}</Text>
                    </View>
                    <TouchableOpacity style={styles.updateBtn}>
                      <Text style={styles.updateBtnText}>Xem thêm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* DỊCH VỤ GỬI HÀNG SWIFT247 */}
          <View style={styles.sectionContainer}>
            <SectionHeader title="Dịch vụ gửi hàng Swift247" showSeeAll={false} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {SERVICE_BANNERS.map((item) => (
                <View key={item.id} style={styles.serviceBannerCard}>
                  <View style={[styles.serviceBannerImg, { backgroundColor: item.color }]}>
                    <Text style={styles.mockImgTextBanner}>{item.mockText}</Text>
                  </View>
                  <Text style={styles.serviceBannerTitle} numberOfLines={1}>{item.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* TIN TỨC CÙNG SWIFT247 */}
          <View style={styles.sectionContainer}>
            <SectionHeader 
              title="Tin tức cùng Swift247" 
              showSeeAll={true} 
              onPress={() => router.push('/news')} 
            />
            <View style={styles.newsGrid}>
              {NEWS_DATA.map((news) => (
                <View key={news.id} style={styles.newsCard}>
                  <View style={[styles.newsImgPlaceholder, { backgroundColor: news.color }]}>
                    <Text style={styles.mockImgTextSmall}>{news.tag}</Text>
                  </View>
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle} numberOfLines={2}>{news.title}</Text>
                    <View style={styles.newsDateRow}>
                      <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
                      <Text style={styles.newsDate}>{news.date}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* ================= SIDEBAR MENU ================= */}
      <Modal visible={isMenuOpen} animationType="fade" transparent={true}>
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity style={styles.sidebarCloseArea} activeOpacity={1} onPress={() => setIsMenuOpen(false)} />
          <View style={styles.sidebarContainer}>
            <View style={styles.sidebarHeader}>
              <Ionicons name="cube" size={32} color="#D82D59" style={{ marginRight: 10 }} />
              <Text style={styles.sidebarLogoText}>SWIFT247</Text>
              <TouchableOpacity style={styles.closeMenuBtn} onPress={() => setIsMenuOpen(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.sidebarMenuContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.menuGroupTitle}>THÔNG TIN CHUNG</Text>
              {SIDEBAR_MENU.map((item) => {
                const isExpanded = expandedMenu === item.id;
                return (
                  <View key={item.id}>
                    <TouchableOpacity 
                      style={styles.menuItem} 
                      activeOpacity={0.7} 
                      onPress={() => {
                        if (item.id === 'locations') {
                          setIsMenuOpen(false);
                          router.push('/locations');
                        } else if (item.subItems) {
                          toggleSubMenu(item.id);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <Ionicons name={item.icon as any} size={22} color={isExpanded ? "#D82D59" : "#4B5563"} style={styles.menuIcon} />
                      <Text style={[styles.menuItemText, isExpanded && styles.menuItemTextActive]}>{item.title}</Text>
                      {item.subItems && <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color={isExpanded ? "#D82D59" : "#9CA3AF"} />}
                    </TouchableOpacity>
                    {item.subItems && isExpanded && (
                      <View style={styles.subMenuContainer}>
                        {item.subItems.map((sub, index) => (
                          <TouchableOpacity key={index} style={styles.subMenuItem} onPress={() => setIsMenuOpen(false)}>
                            <View style={styles.subMenuDot} />
                            <Text style={styles.subMenuItemText}>{sub}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollView: { flex: 1 },

  /* --- KHU VỰC HEADER ĐỎ --- */
  headerRedArea: {
    backgroundColor: '#D82D59',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 50,
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerRightControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerIconBtn: { width: 44, height: 44, backgroundColor: '#FFF', borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 4 },
  notificationDot: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#FACC15', borderWidth: 2, borderColor: '#FFF' },
  
  bannerContainer: { backgroundColor: '#FFFBEB', marginHorizontal: 20, marginTop: 10, borderRadius: 24, padding: 18, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, elevation: 4 },
  bannerSubTitle: { fontSize: 13, fontWeight: '800', color: '#92400E', marginBottom: 12, letterSpacing: 0.5 },
  bannerCodeBox: { flexDirection: 'row', borderRadius: 10, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: '#B91C1C' },
  bannerCodeLeft: { backgroundColor: '#B91C1C', paddingHorizontal: 20, paddingVertical: 10 },
  bannerCodeText: { color: '#FFF', fontWeight: '900', fontSize: 20, letterSpacing: 1 },
  bannerCodeRight: { backgroundColor: '#7F1D1D', paddingHorizontal: 20, paddingVertical: 10 },
  bannerDiscount: { color: '#FFF', fontWeight: '900', fontSize: 20 },
  bannerDesc: { fontSize: 12, color: '#92400E', textAlign: 'center', paddingHorizontal: 10, lineHeight: 18 },

  /* --- THANH TÌM KIẾM NỔI --- */
  floatingSearchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#FFF', 
    marginHorizontal: 20, 
    borderRadius: 30, 
    paddingHorizontal: 20, 
    height: 60, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.12, 
    shadowRadius: 10, 
    elevation: 6, 
    zIndex: 10, 
    marginTop: -30,
  }, 
  searchInner: { flexDirection: 'row', alignItems: 'center' },
  searchText: { fontSize: 16, color: '#374151', marginLeft: 12, fontWeight: '600' },

  /* --- BODY KHU VỰC SÁNG MÀU --- */
  scrollBodyBackground: {
    backgroundColor: '#F8F9FA',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 60,
  },

  /* 4 DỊCH VỤ CHÍNH */
  mainServicesRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 },
  serviceIconWrap: { alignItems: 'center', width: (width - 32) / 4 },
  serviceIconText: { fontSize: 12, fontWeight: '700', color: '#374151', textAlign: 'center', lineHeight: 16 },
  
  thickDivider: { height: 8, backgroundColor: '#F3F4F6' },

  /* CÁC SECTION CHUNG */
  sectionContainer: { paddingVertical: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 16, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1F2937' },
  seeAllText: { fontSize: 13, color: '#D82D59', fontWeight: '700' },
  horizontalScroll: { paddingHorizontal: 16, gap: 12 },

  /* VOUCHERS */
  voucherCard: { flexDirection: 'row', width: 290, backgroundColor: '#FDF2F8', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2 },
  voucherLeft: { width: 80, justifyContent: 'center', alignItems: 'center' },
  voucherLeftTitle: { fontSize: 14, fontWeight: '800', color: '#BE185D', textAlign: 'center' },
  voucherDashLine: { width: 1, height: '100%', borderWidth: 1, borderColor: '#FBCFE8', borderStyle: 'dashed', position: 'relative' },
  cutoutTop: { position: 'absolute', top: -6, left: -6, width: 12, height: 12, borderRadius: 6, backgroundColor: '#F8F9FA' },
  cutoutBottom: { position: 'absolute', bottom: -6, left: -6, width: 12, height: 12, borderRadius: 6, backgroundColor: '#F8F9FA' },
  voucherRight: { flex: 1, padding: 12, justifyContent: 'center' },
  voucherDiscount: { fontSize: 16, fontWeight: '800', color: '#BE185D' },
  voucherMax: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
  voucherDate: { fontSize: 11, color: '#6B7280', marginTop: 4, marginBottom: 10 },
  voucherBtn: { backgroundColor: '#D82D59', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 },
  voucherBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  voucherBtnOutlined: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D82D59' },
  voucherBtnTextOutlined: { color: '#D82D59' },

  /* ĐƠN HÀNG CỦA TÔI */
  orderCard: { marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  orderHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderStatus: { fontSize: 15, fontWeight: '800', color: '#1F2937' },
  orderTimeRow: { flexDirection: 'row', alignItems: 'center' },
  orderTimeText: { fontSize: 12, color: '#6B7280', marginRight: 4, fontWeight: '500' },
  orderContentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12 },
  orderIconBox: { width: 36, height: 36, backgroundColor: '#FCE7F3', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  orderDescText: { fontSize: 13, fontWeight: '600', color: '#4B5563', marginLeft: 12, flex: 1 },

  /* CẬP NHẬT MỚI */
  updateCard: { width: 280, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' },
  imagePlaceholder: { height: 120, justifyContent: 'center', alignItems: 'center' },
  mockImgTextUpdate: { color: '#FFF', fontWeight: '800', fontSize: 15, textAlign: 'center', paddingHorizontal: 10 },
  updateCardContent: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'space-between' },
  updateTextWrap: { flex: 1, paddingRight: 10 },
  updateTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  updateDesc: { fontSize: 11, color: '#6B7280', lineHeight: 15 },
  updateBtn: { backgroundColor: '#B94A6E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  updateBtnText: { color: '#FFF', fontSize: 11, fontWeight: '600' },

  /* DỊCH VỤ SWIFT247 */
  serviceBannerCard: { width: 220 },
  serviceBannerImg: { height: 100, borderRadius: 12, marginBottom: 8, justifyContent: 'center', alignItems: 'center', padding: 10 },
  mockImgTextBanner: { color: '#FFF', fontWeight: '800', fontSize: 14, textAlign: 'center' },
  serviceBannerTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', textAlign: 'left', paddingHorizontal: 2 },

  /* TIN TỨC (GRID) */
  newsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'space-between' },
  newsCard: { width: (width - 44) / 2, marginBottom: 16, backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  newsImgPlaceholder: { height: 110, justifyContent: 'center', alignItems: 'center' },
  mockImgTextSmall: { color: '#FFF', fontWeight: '900', fontSize: 16, textAlign: 'center', paddingHorizontal: 10 },
  newsContent: { padding: 12 },
  newsTitle: { fontSize: 13, fontWeight: '800', color: '#1F2937', marginBottom: 8, lineHeight: 18 },
  newsDateRow: { flexDirection: 'row', alignItems: 'center' },
  newsDate: { fontSize: 11, color: '#9CA3AF', marginLeft: 4, fontWeight: '500' },

  /* SIDEBAR STYLES */
  sidebarOverlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebarCloseArea: { flex: 1 },
  sidebarContainer: { width: width * 0.8, backgroundColor: '#FFF', height: '100%' },
  sidebarHeader: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  sidebarLogoText: { flex: 1, fontSize: 22, fontWeight: '900', color: '#111827' },
  closeMenuBtn: { padding: 4 },
  sidebarMenuContent: { flex: 1, paddingVertical: 10 },
  menuGroupTitle: { fontSize: 12, fontWeight: '700', color: '#9CA3AF', marginTop: 10, marginBottom: 8, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  menuIcon: { marginRight: 14 },
  menuItemText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#374151' },
  menuItemTextActive: { color: '#D82D59' },
  subMenuContainer: { backgroundColor: '#F9FAFB', paddingVertical: 8 },
  subMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingLeft: 56, paddingRight: 20 },
  subMenuDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB', marginRight: 12 },
  subMenuItemText: { fontSize: 14, color: '#4B5563', fontWeight: '600' }
});