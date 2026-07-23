import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Dữ liệu các Banner
const BANNERS = [
  { id: '1', bg: '#FF6B6B', titleSmall: 'Nhập mã', code: 'N50', subSmall: 'Giảm ngay', discount: '50K' },
  { id: '2', bg: '#4ADE80', titleSmall: 'Ưu đãi', code: 'LOVESWIFT', subSmall: 'Giảm đến', discount: '70%' },
  { id: '3', bg: '#8B5CF6', titleSmall: 'Sự kiện', code: 'THÁNG 5', subSmall: 'Deal hot', discount: '30K' },
];

// Danh sách các danh mục tin tức (Filter Chips)
const CATEGORIES = [
  'Tất cả',
  'Cũ nhất',
  'Mới nhất',
  'Nổi bật',
  'Sự kiện',
  'Cẩm nang',
];

const NEWS_LIST = [
  { id: '1', title: 'Mừng Tháng Tri Ân - Giao Hàng Thả Ga', date: '12/07/2023', color: '#3B82F6', mockText: 'LOVESWIFT247' },
  { id: '2', title: 'Tháng 5 Deal Ngút Ngàn. Vô Vàn Giảm Giá.', date: '12/07/2023', color: '#A855F7', mockText: 'THÁNG 5\nDEAL NGÚT NGÀN' },
  { id: '3', title: 'Ưu Đãi Bạn Mới Lên Đến 50%. Gói Siêu Ưu Đãi - Ship Nhiều...', date: '12/07/2023', color: '#F87171', mockText: 'N50 50K' },
  { id: '4', title: 'Gói Siêu Ưu Đãi - Ship Nhiều Chẳng Lo', date: '12/07/2023', color: '#FCA5A5', mockText: 'Đã đến\nkhách hàng' },
  { id: '5', title: 'Super Swift 247 - Tốc Độ Vượt Trội', date: '10/07/2023', color: '#D82D59', mockText: 'SUPER\nSWIFT' },
];

export default function NewsScreen() {
  const router = useRouter();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const scrollRef = useRef<ScrollView>(null);

  // Đồng bộ vị trí banner với dấu 3 chấm khi lướt
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== activeIndex && index >= 0 && index < BANNERS.length) {
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      const nextIndex = activeIndex - 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex < BANNERS.length - 1) {
      const nextIndex = activeIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D82D59" />

      {/* HEADER CỐ ĐỊNH */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin tức cùng Swift247</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        
        {/* BANNER CAROUSEL */}
        <View style={styles.carouselWrapper}>
          <ScrollView 
            ref={scrollRef}
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
            style={styles.carouselContainer}
          >
            {BANNERS.map((banner) => (
              <View key={banner.id} style={styles.slide}>
                <View style={[styles.slideImage, { backgroundColor: banner.bg }]}>
                  <View style={styles.mockBannerBadge}>
                    <Text style={styles.mockBannerTextSmall}>{banner.titleSmall}</Text>
                    <Text style={styles.mockBannerTextBig}>{banner.code}</Text>
                  </View>
                  <View style={styles.mockBannerBadge2}>
                    <Text style={styles.mockBannerTextSmall}>{banner.subSmall}</Text>
                    <Text style={styles.mockBannerTextBig}>{banner.discount}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Mũi tên trái / phải */}
          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={20} color="#D82D59" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowRight} onPress={handleNext} activeOpacity={0.8}>
            <Ionicons name="chevron-forward" size={20} color="#D82D59" />
          </TouchableOpacity>
        </View>

        {/* DẤU 3 CHẤM PHÂN TRANG */}
        <View style={styles.paginationDots}>
          {BANNERS.map((_, index) => (
            <View 
              key={index} 
              style={index === activeIndex ? styles.dotActive : styles.dotInactive} 
            />
          ))}
        </View>

        {/* CÁC NÚT PHÂN LOẠI (CATEGORY CHIPS) */}
        <View style={styles.categoryContainer}>
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DANH SÁCH BÀI VIẾT */}
        <View style={styles.listContainer}>
          {NEWS_LIST.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsItem} activeOpacity={0.7}>
              <View style={[styles.newsImagePlaceholder, { backgroundColor: item.color }]}>
                <Text style={styles.newsImageText} numberOfLines={2}>{item.mockText}</Text>
              </View>
              <View style={styles.newsContent}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle} numberOfLines={3}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },

  /* BANNER CAROUSEL */
  carouselWrapper: {
    position: 'relative',
    marginTop: 16,
  },
  carouselContainer: {
    height: 160,
  },
  slide: {
    width: width,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  arrowLeft: {
    position: 'absolute',
    left: 8,
    top: '40%',
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  arrowRight: {
    position: 'absolute',
    right: 8,
    top: '40%',
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    elevation: 3,
  },
  
  mockBannerBadge: { backgroundColor: '#FCD34D', padding: 10, borderRadius: 10, alignItems: 'center' },
  mockBannerBadge2: { backgroundColor: '#FCA5A5', padding: 10, borderRadius: 10, alignItems: 'center' },
  mockBannerTextSmall: { fontSize: 11, color: '#78350F', fontWeight: '600' },
  mockBannerTextBig: { fontSize: 22, color: '#78350F', fontWeight: '900' },

  /* PAGINATION DOTS */
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D82D59' },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },

  /* CÁC NÚT PHÂN LOẠI (CATEGORY CHIPS) */
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FCE7F3', // Nền hồng nhạt cho nút chưa chọn
  },
  categoryChipActive: {
    backgroundColor: '#D82D59', // Nền đỏ đô cho nút đang chọn
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D82D59', // Chữ màu đỏ mận
  },
  categoryTextActive: {
    color: '#FFFFFF', // Chữ màu trắng khi được chọn
  },

  /* DANH SÁCH BÀI VIẾT */
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  newsImagePlaceholder: {
    width: 130,
    height: 85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  newsImageText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  newsContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 20,
  },
});