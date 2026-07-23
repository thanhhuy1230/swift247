import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const BANNERS = [
  { id: '1', code: 'NEWYS247', discount: '50%' },
  { id: '2', code: 'LIXI2024', discount: '30%' },
  { id: '3', code: 'FREESHIP', discount: '100%' },
];

const PAYMENT_METHODS = [
  {
    id: '1',
    title: 'Ví GalaxyPay',
    subtitle: 'Thanh toán qua ví Galaxy Pay',
    iconName: 'google-circles-extended',
    iconColor: '#F59E0B',
  },
  {
    id: '2',
    title: 'Top up',
    subtitle: 'Thanh toán bằng ví Top up',
    iconName: 'record-circle-outline',
    iconColor: '#F97316',
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== activeIndex && index >= 0 && index < BANNERS.length) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D82D59" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
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
                <View style={styles.bannerBackground}>
                  <View style={styles.bannerCodeBox}>
                    <View style={styles.bannerCodeLeft}>
                      <Text style={styles.bannerCodeSmallText}>MÃ KHUYẾN MÃI</Text>
                      <Text style={styles.bannerCodeBigText}>{banner.code}</Text>
                    </View>
                    <View style={styles.bannerCodeRight}>
                      <Text style={styles.bannerCodeSmallText}>GIẢM</Text>
                      <Text style={styles.bannerCodeBigText}>{banner.discount}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.paginationDots}>
            {BANNERS.map((_, index) => (
              <View 
                key={index} 
                style={index === activeIndex ? styles.dotActive : styles.dotInactive} 
              />
            ))}
          </View>
        </View>

        <View style={styles.paymentCard}>
          {PAYMENT_METHODS.map((method, index) => {
            const isLastItem = index === PAYMENT_METHODS.length - 1;

            return (
              <View key={method.id}>
                <TouchableOpacity style={styles.paymentItem} activeOpacity={0.7}>
                  <View style={styles.iconBox}>
                    <MaterialCommunityIcons name={method.iconName as any} size={28} color={method.iconColor} />
                  </View>

                  <View style={styles.paymentContent}>
                    <Text style={styles.paymentTitle}>{method.title}</Text>
                    <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#D82D59" />
                </TouchableOpacity>

                {isLastItem ? null : <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  carouselWrapper: {
    marginTop: 16,
    marginBottom: 20,
  },
  carouselContainer: {
    height: 140,
  },
  slide: {
    width: width,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerBackground: {
    width: '100%',
    height: 120,
    backgroundColor: '#FDE68A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bannerCodeBox: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#991B1B',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerCodeLeft: {
    backgroundColor: '#B91C1C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCodeRight: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCodeSmallText: {
    color: '#FDE047',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerCodeBigText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dotActive: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D82D59' },
  dotInactive: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconBox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentContent: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  paymentSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 52,
  },
});