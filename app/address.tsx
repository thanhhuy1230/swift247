import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
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
import MapViewComponent from '../components/MapViewComponent';

const PINK_PRIMARY = '#B94A6E';

const INITIAL_ADDRESSES = [
  { id: '1', name: 'Nhà riêng', phone: '0935789471', address: 'Chung cư Richstar 1 278 Hoà Bình phường Hiệp Bình Chánh, Thủ Đức', isDefault: true, type: 'Nhà riêng' },
  { id: '2', name: 'Văn phòng', phone: '0935789471', address: '60A Trường Sơn, Phường 2, Quận Tân Bình, Hồ Chí Minh', isDefault: false, type: 'Văn phòng' },
];

export default function AddressScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [mapPickerVisible, setMapPickerVisible] = useState(false);

  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [selectedAddressText, setSelectedAddressText] = useState('60A Trường Sơn, Phường 2, Quận Tân Bình');
  const [addressType, setAddressType] = useState<'home' | 'office'>('home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PINK_PRIMARY} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sổ địa chỉ</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.headerAddText}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Địa chỉ đã lưu</Text>

        {addresses.map((item) => (
          <View key={item.id} style={styles.addressCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPhone}> - {item.phone}</Text>
              </View>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Mặc định</Text>
                </View>
              )}
            </View>

            <Text style={styles.cardFullAddress}>{item.address}</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.actionLink}>
                <Text style={styles.actionLinkTextEdit}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionLink}>
                <Text style={styles.actionLinkTextDelete}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* MODAL THÊM ĐỊA CHỈ */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Thêm địa chỉ mới</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Họ tên</Text>
              <TextInput style={styles.inputBox} placeholder="Nhập họ tên người nhận" value={receiverName} onChangeText={setReceiverName} />

              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <TextInput style={styles.inputBox} placeholder="Nhập số điện thoại" keyboardType="phone-pad" value={receiverPhone} onChangeText={setReceiverPhone} />

              <Text style={styles.inputLabel}>Chi tiết địa chỉ</Text>
              <TouchableOpacity style={styles.mapSelectBox} onPress={() => setMapPickerVisible(true)}>
                <Ionicons name="location-outline" size={18} color={PINK_PRIMARY} style={{ marginRight: 6 }} />
                <Text style={styles.mapSelectBoxText} numberOfLines={1}>{selectedAddressText}</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Tỉnh/Thành phố</Text>
              <TextInput style={styles.inputBox} value="Hồ Chí Minh" editable={false} />

              <Text style={styles.inputLabel}>Quận/Huyện</Text>
              <TextInput style={styles.inputBox} value="Quận Tân Bình" editable={false} />

              <Text style={styles.inputLabel}>Phường/Xã</Text>
              <TextInput style={styles.inputBox} value="Phường 2" editable={false} />

              <Text style={styles.inputLabel}>Loại địa chỉ</Text>
              <View style={styles.typeToggleRow}>
                <TouchableOpacity 
                  style={[styles.typeBtn, addressType === 'home' && styles.typeBtnActive]}
                  onPress={() => setAddressType('home')}
                >
                  <Text style={[styles.typeBtnText, addressType === 'home' && styles.typeBtnTextActive]}>Nhà riêng</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.typeBtn, addressType === 'office' && styles.typeBtnActive]}
                  onPress={() => setAddressType('office')}
                >
                  <Text style={[styles.typeBtnText, addressType === 'office' && styles.typeBtnTextActive]}>Văn phòng</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.saveBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveBtnText}>Lưu</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL BẢN ĐỒ */}
      <Modal visible={mapPickerVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.mapModalContainer}>
            <View style={styles.mapHeaderRow}>
              <TouchableOpacity style={styles.mapCloseBtn} onPress={() => setMapPickerVisible(false)}>
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <MapViewComponent />
            </View>

            <View style={styles.mapConfirmSheet}>
              <Text style={styles.mapSelectedTitle}>60A Trường Sơn</Text>
              <Text style={styles.mapSelectedSub}>60A Trường Sơn, Phường 2, Quận Tân Bình, Hồ Chí Minh</Text>
              
              <TouchableOpacity 
                style={styles.confirmMapBtn}
                onPress={() => {
                  setSelectedAddressText('60A Trường Sơn, Phường 2, Quận Tân Bình');
                  setMapPickerVisible(false);
                }}
              >
                <Text style={styles.confirmMapBtnText}>Xác nhận địa chỉ</Text>
              </TouchableOpacity>
            </View>
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
  headerAddText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  scrollContent: { padding: 16 },

  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginBottom: 12 },

  addressCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOpacity: 0.04, elevation: 2,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitleWrap: { flexDirection: 'row', alignItems: 'center' },
  cardName: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  cardPhone: { fontSize: 13, color: '#6B7280' },
  defaultBadge: { backgroundColor: '#FDF2F8', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  defaultBadgeText: { fontSize: 10, fontWeight: '700', color: PINK_PRIMARY },
  cardFullAddress: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 10 },
  actionLink: { paddingVertical: 4, paddingHorizontal: 4 }, // ĐÃ THÊM ACTIONLINK VÀO ĐÂY
  actionLinkTextEdit: { fontSize: 13, fontWeight: '600', color: PINK_PRIMARY },
  actionLinkTextDelete: { fontSize: 13, fontWeight: '600', color: '#EF4444' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '85%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },

  inputLabel: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 12 },
  inputBox: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, height: 44, fontSize: 14, color: '#1F2937' },
  
  mapSelectBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, height: 44,
  },
  mapSelectBoxText: { flex: 1, fontSize: 14, color: '#1F2937' },

  typeToggleRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  typeBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, alignItems: 'center' },
  typeBtnActive: { backgroundColor: '#FDF2F8', borderColor: PINK_PRIMARY },
  typeBtnText: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
  typeBtnTextActive: { color: PINK_PRIMARY },

  saveBtn: { backgroundColor: PINK_PRIMARY, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 20 },
  saveBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  mapModalContainer: { flex: 1, backgroundColor: '#E5E7EB', position: 'relative' },
  mapHeaderRow: { position: 'absolute', top: 50, left: 16, zIndex: 10 },
  mapCloseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  mapConfirmSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  mapSelectedTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  mapSelectedSub: { fontSize: 12, color: '#6B7280', marginBottom: 16 },
  confirmMapBtn: { backgroundColor: PINK_PRIMARY, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  confirmMapBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});