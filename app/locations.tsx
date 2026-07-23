import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapViewComponent from '../components/MapViewComponent'; // Dùng component đa nền tảng thay cho react-native-maps trực tiếp

const PINK_PRIMARY = '#B94A6E';

// Dữ liệu mẫu Tỉnh/Thành phố
const PROVINCES = [
  'Hà Nội', 'Hồ Chí Minh', 'An Giang', 'Bà Rịa Vũng Tàu', 
  'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương'
];

// Dữ liệu mẫu Quận/Huyện tương ứng theo Tỉnh/Thành phố
const DISTRICTS_DATA: Record<string, string[]> = {
  'Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Quận 10', 'Quận Tân Bình', 'Quận Bình Thạnh', 'Thành phố Thủ Đức'],
  'Hà Nội': ['Quận Hoàn Kiếm', 'Quận Ba Đình', 'Quận Đống Đa', 'Quận Cầu Giấy', 'Quận Thanh Xuân', 'Quận Hà Đông'],
  'Đà Nẵng': ['Quận Hải Châu', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Quận Thanh Khê'],
};

export default function LocationsScreen() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  // Trạng thái Modal
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [provinceModalVisible, setProvinceModalVisible] = useState(false);
  const [districtModalVisible, setDistrictModalVisible] = useState(false);

  // Giá trị bộ lọc
  const [selectedSort, setSelectedSort] = useState('Gần nhất');
  const [selectedProvince, setSelectedProvince] = useState('Hồ Chí Minh');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả quận/huyện');
  
  const [provinceSearch, setProvinceSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');

  const currentDistricts = DISTRICTS_DATA[selectedProvince] || ['Quận 1', 'Quận 2', 'Quận 3', 'Quận Tân Bình', 'Quận Phú Nhuận'];

  const filteredProvinces = PROVINCES.filter(p => 
    p.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const filteredDistricts = currentDistricts.filter(d => 
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PINK_PRIMARY} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách bưu cục</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* THANH TÌM KIẾM */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Tìm kiếm bưu cục..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* THANH BỘ LỌC CHIPS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          
          {/* Nút Sắp xếp */}
          <TouchableOpacity style={styles.filterChip} onPress={() => setSortModalVisible(true)}>
            <Text style={styles.filterChipText}>Sắp xếp: {selectedSort}</Text>
            <Ionicons name="chevron-down" size={14} color="#4B5563" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Lọc:</Text>
          </TouchableOpacity>

          {/* Nút Tỉnh/Thành phố */}
          <TouchableOpacity style={styles.filterChip} onPress={() => setProvinceModalVisible(true)}>
            <Text style={styles.filterChipText}>{selectedProvince}</Text>
            <Ionicons name="chevron-down" size={14} color="#4B5563" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          {/* Nút Quận/Huyện */}
          <TouchableOpacity style={styles.filterChip} onPress={() => setDistrictModalVisible(true)}>
            <Text style={styles.filterChipText}>{selectedDistrict}</Text>
            <Ionicons name="chevron-down" size={14} color="#4B5563" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ScrollView>

        {/* THẺ CHỌN VỊ TRÍ / BẢN ĐỒ */}
        <TouchableOpacity 
          style={styles.locationToggleCard} 
          activeOpacity={0.8}
          onPress={() => setMapModalVisible(true)}
        >
          <View style={styles.locationToggleLeft}>
            <View style={styles.locationIconBox}>
              <Ionicons name="location" size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.locationToggleTitle}>
                {useCurrentLocation ? 'Sử dụng vị trí các bưu cục gần tôi' : 'Chọn từ bản đồ Google Maps'}
              </Text>
              <Text style={styles.locationToggleSub} numberOfLines={1}>
                60A Trường Sơn, Phường 2, Quận Tân Bình, Hồ Chí Minh...
              </Text>
            </View>
          </View>
          {useCurrentLocation && (
            <View style={styles.checkIconCircle}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>

        {/* ================= BƯU CỤC GẦN BẠN ================= */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeaderTitle}>Bưu cục gần bạn (3)</Text>

          {/* Item Bưu cục */}
          <View style={styles.branchCard}>
            <View style={styles.branchCardTop}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=300&auto=format&fit=crop' }} 
                style={styles.branchImage} 
              />
              <View style={styles.branchInfo}>
                <View style={styles.branchNameRow}>
                  <Text style={styles.branchName}>Bưu cục Trường Sơn</Text>
                  <View style={styles.selectedTag}>
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.branchTime}>Mở cửa: 8:00 - 17:00</Text>
                <Text style={styles.branchDesc} numberOfLines={2}>
                  Lobortis accumsan pretium a in. Dolor consequat sed inpretium a in...
                </Text>

                <TouchableOpacity style={styles.callBtn} activeOpacity={0.7}>
                  <Ionicons name="call" size={12} color="#4B5563" />
                  <Text style={styles.callBtnText}>Gọi</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.branchCardBottom}>
              <TouchableOpacity style={styles.datDonBtn} onPress={() => router.push('/booking')}>
                <Text style={styles.datDonBtnText}>Đặt đơn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* FOOTER ĐẶT ĐƠN NGAY */}
      <View style={styles.footerBar}>
        <TouchableOpacity 
          style={styles.mainDatDonNgayBtn} 
          activeOpacity={0.9}
          onPress={() => router.push('/booking')}
        >
          <Text style={styles.mainDatDonNgayText}>Đặt đơn ngay</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODAL 1: BẢN ĐỒ ĐA NỀN TẢNG ================= */}
      <Modal visible={mapModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.mapContainer}>
            <View style={styles.mapHeaderRow}>
              <TouchableOpacity style={styles.mapCloseBtn} onPress={() => setMapModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>
            
            {/* Sử dụng MapViewComponent tự động chạy trên cả Web lẫn Mobile */}
            <View style={{ flex: 1 }}>
              <MapViewComponent />
            </View>
          </View>

          <View style={styles.mapBottomSheet}>
            <View style={styles.mapAddressRow}>
              <Ionicons name="location" size={20} color={PINK_PRIMARY} style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.mapAddressTitle}>60A Trường Sơn</Text>
                <Text style={styles.mapAddressSub}>60A Trường Sơn, Phường 2, Quận Tân Bình, Hồ Chí Minh</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.confirmMapAddressBtn}
              onPress={() => {
                setUseCurrentLocation(false);
                setMapModalVisible(false);
              }}
            >
              <Text style={styles.confirmMapAddressText}>Xác nhận địa chỉ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 2: SẮP XẾP ================= */}
      <Modal visible={sortModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlayCenter}>
          <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={() => setSortModalVisible(false)} />
          <View style={styles.centerSheet}>
            <View style={styles.sheetTopBar}>
              <Text style={styles.sheetTitle}>Sắp xếp</Text>
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.sheetOptionItem}
              onPress={() => { setSelectedSort('Gần nhất'); setSortModalVisible(false); }}
            >
              <Text style={[styles.sheetOptionText, selectedSort === 'Gần nhất' && styles.sheetOptionTextActive]}>Gần nhất</Text>
              {selectedSort === 'Gần nhất' && <Ionicons name="checkmark" size={18} color={PINK_PRIMARY} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sheetOptionItem}
              onPress={() => { setSelectedSort('Phổ biến'); setSortModalVisible(false); }}
            >
              <Text style={[styles.sheetOptionText, selectedSort === 'Phổ biến' && styles.sheetOptionTextActive]}>Phổ biến</Text>
              {selectedSort === 'Phổ biến' && <Ionicons name="checkmark" size={18} color={PINK_PRIMARY} />}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 3: CHỌN TỈNH / THÀNH PHỐ ================= */}
      <Modal visible={provinceModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setProvinceModalVisible(false)} activeOpacity={1} />
          
          <View style={styles.provinceBottomSheet}>
            <View style={styles.sheetTopBar}>
              <TouchableOpacity onPress={() => setProvinceModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Tỉnh/Thành phố</Text>
              <View style={{ width: 22 }} />
            </View>

            <View style={styles.modalSearchBox}>
              <Ionicons name="search-outline" size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
              <TextInput 
                placeholder="Tìm kiếm tỉnh thành"
                placeholderTextColor="#9CA3AF"
                style={styles.modalSearchInput}
                value={provinceSearch}
                onChangeText={setProvinceSearch}
              />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
              {filteredProvinces.map((province, index) => {
                const isSelected = selectedProvince === province;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.provinceItemRow}
                    onPress={() => {
                      setSelectedProvince(province);
                      setSelectedDistrict('Tất cả quận/huyện');
                      setProvinceModalVisible(false);
                    }}
                  >
                    <Text style={[styles.provinceItemText, isSelected && { color: PINK_PRIMARY, fontWeight: '700' }]}>
                      {province}
                    </Text>
                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL 4: CHỌN QUẬN / HUYỆN ================= */}
      <Modal visible={districtModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setDistrictModalVisible(false)} activeOpacity={1} />
          
          <View style={styles.provinceBottomSheet}>
            <View style={styles.sheetTopBar}>
              <TouchableOpacity onPress={() => setDistrictModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Quận/Huyện ({selectedProvince})</Text>
              <View style={{ width: 22 }} />
            </View>

            <View style={styles.modalSearchBox}>
              <Ionicons name="search-outline" size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
              <TextInput 
                placeholder="Tìm kiếm quận huyện"
                placeholderTextColor="#9CA3AF"
                style={styles.modalSearchInput}
                value={districtSearch}
                onChangeText={setDistrictSearch}
              />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
              <TouchableOpacity 
                style={styles.provinceItemRow}
                onPress={() => {
                  setSelectedDistrict('Tất cả quận/huyện');
                  setDistrictModalVisible(false);
                }}
              >
                <Text style={[styles.provinceItemText, selectedDistrict === 'Tất cả quận/huyện' && { color: PINK_PRIMARY, fontWeight: '700' }]}>
                  Tất cả quận/huyện
                </Text>
                <View style={[styles.radioOuter, selectedDistrict === 'Tất cả quận/huyện' && styles.radioOuterSelected]}>
                  {selectedDistrict === 'Tất cả quận/huyện' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              {filteredDistricts.map((district, index) => {
                const isSelected = selectedDistrict === district;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.provinceItemRow}
                    onPress={() => {
                      setSelectedDistrict(district);
                      setDistrictModalVisible(false);
                    }}
                  >
                    <Text style={[styles.provinceItemText, isSelected && { color: PINK_PRIMARY, fontWeight: '700' }]}>
                      {district}
                    </Text>
                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
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
  header: {
    backgroundColor: PINK_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: { width: 30, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 12, height: 46, marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1F2937' },

  filterRow: { gap: 8, paddingBottom: 16 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, height: 36,
  },
  filterChipText: { fontSize: 13, fontWeight: '600', color: '#4B5563' },

  locationToggleCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 20,
    borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  locationToggleLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  locationIconBox: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: PINK_PRIMARY,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  locationToggleTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  locationToggleSub: { fontSize: 12, color: '#6B7280' },
  checkIconCircle: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: PINK_PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },

  sectionBlock: { marginBottom: 20 },
  sectionHeaderTitle: { fontSize: 15, fontWeight: '800', color: '#1F2937', marginBottom: 12 },

  branchCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  branchCardTop: { flexDirection: 'row', alignItems: 'flex-start' },
  branchImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#E5E7EB', marginRight: 12 },
  branchInfo: { flex: 1 },
  branchNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  branchName: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  selectedTag: {
    width: 18, height: 18, borderRadius: 9, backgroundColor: PINK_PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },
  branchTime: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  branchDesc: { fontSize: 11, color: '#9CA3AF', marginBottom: 8, lineHeight: 15 },
  callBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, gap: 4,
  },
  callBtnText: { fontSize: 11, fontWeight: '600', color: '#4B5563' },
  branchCardBottom: {
    marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6', alignItems: 'flex-end',
  },
  datDonBtn: { backgroundColor: PINK_PRIMARY, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  datDonBtnText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },

  footerBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF',
    paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  mainDatDonNgayBtn: {
    backgroundColor: PINK_PRIMARY, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  mainDatDonNgayText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  mapContainer: { flex: 1, backgroundColor: '#E5E7EB', position: 'relative' },
  mapHeaderRow: { position: 'absolute', top: 50, left: 16, zIndex: 10 },
  mapCloseBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, elevation: 3,
  },
  mapBottomSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20,
  },
  mapAddressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mapAddressTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  mapAddressSub: { fontSize: 12, color: '#6B7280' },
  confirmMapAddressBtn: {
    backgroundColor: PINK_PRIMARY, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  confirmMapAddressText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },

  modalOverlayCenter: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  centerSheet: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  sheetTopBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  sheetOptionItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  sheetOptionText: { fontSize: 15, color: '#4B5563', fontWeight: '500' },
  sheetOptionTextActive: { color: PINK_PRIMARY, fontWeight: '700' },

  provinceBottomSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '75%', padding: 16,
  },
  modalSearchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6',
    borderRadius: 10, paddingHorizontal: 10, height: 40, marginBottom: 12,
  },
  modalSearchInput: { flex: 1, fontSize: 13, color: '#1F2937' },
  provinceItemRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F9FAFB',
  },
  provinceItemText: { fontSize: 15, color: '#374151' },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D1D5DB',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: PINK_PRIMARY },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: PINK_PRIMARY },
});