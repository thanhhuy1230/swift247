import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
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

// Kiểu dữ liệu cho Sản phẩm
type ProductItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function BookingScreen() {
  const router = useRouter();

  // --- TRẠNG THÁI FORM & ĐƠN HÀNG ---
  const [items, setItems] = useState<ProductItem[]>([
    { id: '1', name: 'Smartphone', quantity: 4, category: 'Thiết bị điện tử' },
    { id: '2', name: 'Bút chì', quantity: 2, category: 'Đồ dùng học sinh' },
    { id: '3', name: 'Bình nước', quantity: 2, category: 'Thiết bị điện gia dụng' },
  ]);

  // Form Thêm sản phẩm
  const [itemType, setItemType] = useState<'parcel' | 'document'>('parcel');
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1.0');

  // Form Cân nặng & Kích thước
  const [weight, setWeight] = useState('0.0');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // --- HÌNH THỨC GIAO NHẬN (4 THẺ LƯỚI TRỰC QUAN) ---
  const [deliveryType, setDeliveryType] = useState<'home_home' | 'home_post' | 'post_home' | 'post_post'>('home_post');

  // --- TRẠNG THÁI MODAL CHỌN PHƯƠNG THỨC VẬN CHUYỂN CHI TIẾT (MỚI) ---
  const [shippingModalVisible, setShippingModalVisible] = useState(false);
  const [activeSpeedTab, setActiveSpeedTab] = useState<'standard' | 'fast' | 'express'>('standard');
  const [tempSelectedDelivery, setTempSelectedDelivery] = useState<'home_home' | 'home_post' | 'post_home' | 'post_post'>('home_post');

  // Dịch vụ thêm
  const [extraPackaging, setExtraPackaging] = useState(true);
  const [extraSms, setExtraSms] = useState(false);

  // --- TRẠNG THÁI PHƯƠNG THỨC THANH TOÁN ---
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'atm' | 'credit'>('cash');

  // --- TRẠNG THÁI ĐỊA CHỈ & BẢN ĐỒ ---
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [activeAddressType, setActiveAddressType] = useState<'sender' | 'receiver'>('sender');
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [mapPickerModalVisible, setMapPickerModalVisible] = useState(false);

  // --- TRẠNG THÁI THÔNG BÁO THÀNH CÔNG ---
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Dữ liệu địa chỉ đang chọn trên form
  const [senderAddress, setSenderAddress] = useState({
    name: 'Nguyễn Văn B',
    phone: '0935789471',
    address: 'Chung cư Richstar 1 278 Hoà Bình phường Hiệp Bình Chánh, Thủ Đức'
  });
  const [receiverAddress, setReceiverAddress] = useState({
    name: 'Nguyễn Văn A',
    phone: '0935789471',
    address: 'Chung cư Richstar 1 278 Hoà Bình phường Hiệp Bình Chánh, Thủ Đức'
  });

  // Danh sách gợi ý địa chỉ trong modal
  const suggestedAddresses = [
    { title: 'Menas Mall', address: '60A Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh' },
    { title: 'Menas Mall', address: '60A Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh' },
    { title: 'Menas Mall', address: '60A Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh' },
    { title: '60A Trường Sơn', address: '60A Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh' },
  ];

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'cash': return 'Tiền mặt';
      case 'atm': return 'Thẻ ATM';
      case 'credit': return 'Thẻ tín dụng';
      default: return 'Tiền mặt';
    }
  };

  // Lấy tên hiển thị của hình thức giao nhận hiện tại
  const getDeliveryName = (type: string) => {
    switch (type) {
      case 'home_home': return 'Giao nhận tại nhà';
      case 'home_post': return 'Giao tại nhà - Nhận tại bưu cục';
      case 'post_home': return 'Giao tại bưu cục - Nhận tại nhà';
      case 'post_post': return 'Giao nhận tại bưu cục';
      default: return 'Giao tại nhà - Nhận tại bưu cục';
    }
  };

  const getDeliveryPrice = (type: string) => {
    return type === 'home_post' ? '20.000đ' : '43.000đ';
  };

  // Kích thước mẫu
  const presetSizes = ['10x10x20 cm', '20x20x30 cm', '20x20x30 cm', '5x5x5 cm', '2x2x2 cm', '8x8x8 cm'];

  // Hàm xóa sản phẩm khỏi danh sách
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Hàm thêm sản phẩm mới
  const handleAddItem = () => {
    if (!productName.trim()) {
      return;
    }
    const newItem: ProductItem = {
      id: Date.now().toString(),
      name: productName,
      quantity: parseFloat(quantity) || 1,
      category: category || 'Hàng hóa thông thường',
    };
    setItems(prev => [...prev, newItem]);
    setProductName('');
    setQuantity('1.0');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor="#B94A6E" />

      {/* HEADER CỐ ĐỊNH */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt giao hàng</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* KHỐI 1: THẺ ĐỊA CHỈ GỬI & NHẬN */}
        <View style={styles.addressCard}>
          <TouchableOpacity style={styles.swapAddressBtn} activeOpacity={0.7}>
            <Ionicons name="swap-vertical" size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Địa chỉ gửi */}
          <TouchableOpacity 
            style={styles.addressRow} 
            activeOpacity={0.7}
            onPress={() => { setActiveAddressType('sender'); setAddressModalVisible(true); }}
          >
            <View style={styles.senderDotOuter}>
              <View style={styles.senderDotInner} />
            </View>
            <View style={styles.addressTextContent}>
              <Text style={styles.addressHeading}>Địa chỉ gửi hàng</Text>
              <Text style={styles.personInfo}>{senderAddress.name} - {senderAddress.phone}</Text>
              <Text style={styles.fullAddress} numberOfLines={2}>{senderAddress.address}</Text>
            </View>
          </TouchableOpacity>

          {/* Đường nối đứt nét */}
          <View style={styles.connectorLineContainer}>
            <View style={styles.dashedLineVertical} />
          </View>

          {/* Địa chỉ nhận */}
          <TouchableOpacity 
            style={styles.addressRow} 
            activeOpacity={0.7}
            onPress={() => { setActiveAddressType('receiver'); setAddressModalVisible(true); }}
          >
            <Ionicons name="location" size={22} color="#B94A6E" style={{ marginLeft: -2, marginRight: 10 }} />
            <View style={styles.addressTextContent}>
              <Text style={styles.addressHeading}>Địa chỉ nhận hàng</Text>
              <Text style={styles.personInfo}>{receiverAddress.name} - {receiverAddress.phone}</Text>
              <Text style={styles.fullAddress} numberOfLines={2}>{receiverAddress.address}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* KHỐI 2: ĐƠN HÀNG (DANH SÁCH ĐÃ THÊM) */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Đơn hàng</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{items.length}</Text>
            </View>
          </View>

          {items.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <View style={styles.productIconBox}>
                <Ionicons name="cube" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.productMainInfo}>
                <View style={styles.productTitleRow}>
                  <Text style={styles.productQuantity}>{item.quantity}x</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
                <View style={styles.categoryChip}>
                  <Text style={styles.categoryChipText}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.actionIconGroup}>
                <TouchableOpacity style={styles.iconActionBtn}>
                  <Feather name="edit-3" size={18} color="#9CA3AF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconActionBtn} onPress={() => handleDeleteItem(item.id)}>
                  <Feather name="trash-2" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* KHỐI 3: THÊM SẢN PHẨM */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderAccordion}>
            <Text style={styles.sectionTitle}>Thêm sản phẩm</Text>
            <Ionicons name="remove" size={22} color="#374151" />
          </View>

          {/* Toggle Bưu kiện / Tài liệu */}
          <View style={styles.pillToggleContainer}>
            <TouchableOpacity 
              style={[styles.pillBtn, itemType === 'parcel' && styles.pillBtnActive]} 
              onPress={() => setItemType('parcel')}
            >
              <Ionicons name="cube-outline" size={18} color={itemType === 'parcel' ? "#FFF" : "#6B7280"} />
              <Text style={[styles.pillBtnText, itemType === 'parcel' && styles.pillBtnTextActive]}>Bưu kiện</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.pillBtn, itemType === 'document' && styles.pillBtnActive]} 
              onPress={() => setItemType('document')}
            >
              <Ionicons name="document-text-outline" size={18} color={itemType === 'document' ? "#FFF" : "#6B7280"} />
              <Text style={[styles.pillBtnText, itemType === 'document' && styles.pillBtnTextActive]}>Tài liệu</Text>
            </TouchableOpacity>
          </View>

          {/* Danh mục sản phẩm */}
          <View style={styles.inputFormGroup}>
            <Text style={styles.fieldLabel}>Danh mục sản phẩm</Text>
            <TouchableOpacity style={styles.dropdownSelect}>
              <Text style={styles.dropdownText}>{category || 'Danh mục sản phẩm'}</Text>
              <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Tên sản phẩm */}
          <View style={styles.inputFormGroup}>
            <Text style={styles.fieldLabel}>Tên sản phẩm</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Nhập tên sản phẩm của bạn" 
              placeholderTextColor="#9CA3AF"
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          {/* Số lượng */}
          <View style={styles.inputFormGroup}>
            <Text style={styles.fieldLabel}>Số lượng</Text>
            <View style={styles.numberInputWrapper}>
              <TextInput 
                style={styles.numberInput} 
                keyboardType="decimal-pad" 
                value={quantity} 
                onChangeText={setQuantity} 
              />
              <View style={styles.spinnerControls}>
                <TouchableOpacity onPress={() => setQuantity((parseFloat(quantity) + 1).toFixed(1))}>
                  <Ionicons name="chevron-up" size={14} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, parseFloat(quantity) - 1).toFixed(1))}>
                  <Ionicons name="chevron-down" size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Button Thêm vào đơn hàng */}
          <TouchableOpacity style={styles.addOrderOutlineBtn} onPress={handleAddItem}>
            <Ionicons name="add" size={20} color="#B94A6E" />
            <Text style={styles.addOrderOutlineBtnText}>Thêm vào đơn hàng</Text>
          </TouchableOpacity>
        </View>

        {/* KHỐI 4: CÂN NẶNG & KÍCH THƯỚC */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Cân nặng & kích thước kiện hàng</Text>

          {/* Cân nặng */}
          <View style={styles.inputFormGroup}>
            <Text style={styles.fieldLabel}>Cân nặng</Text>
            <View style={styles.numberInputWrapper}>
              <TextInput 
                style={styles.numberInput} 
                keyboardType="decimal-pad" 
                value={`${weight} kg`} 
                onChangeText={(text) => setWeight(text.replace(' kg', ''))} 
              />
              <View style={styles.spinnerControls}>
                <TouchableOpacity onPress={() => setWeight((parseFloat(weight) + 0.5).toFixed(1))}>
                  <Ionicons name="chevron-up" size={14} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setWeight(Math.max(0, parseFloat(weight) - 0.5).toFixed(1))}>
                  <Ionicons name="chevron-down" size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Kích thước Dài x Rộng x Cao */}
          <Text style={styles.fieldLabel}>Kích thước</Text>
          <View style={styles.dimensionsRow}>
            <View style={styles.dimBox}>
              <Text style={styles.dimFloatingLabel}>Dài</Text>
              <View style={styles.dimInputWrap}>
                <TextInput style={styles.dimInput} keyboardType="numeric" value={length} onChangeText={setLength} placeholder="0" />
                <Text style={styles.dimUnit}>cm</Text>
              </View>
            </View>
            <View style={styles.dimBox}>
              <Text style={styles.dimFloatingLabel}>Rộng</Text>
              <View style={styles.dimInputWrap}>
                <TextInput style={styles.dimInput} keyboardType="numeric" value={width} onChangeText={setWidth} placeholder="0" />
                <Text style={styles.dimUnit}>cm</Text>
              </View>
            </View>
            <View style={styles.dimBox}>
              <Text style={styles.dimFloatingLabel}>Cao</Text>
              <View style={styles.dimInputWrap}>
                <TextInput style={styles.dimInput} keyboardType="numeric" value={height} onChangeText={setHeight} placeholder="0" />
                <Text style={styles.dimUnit}>cm</Text>
              </View>
            </View>
          </View>

          {/* Gợi ý kích thước mẫu */}
          <View style={styles.presetChipsWrap}>
            {presetSizes.map((size, index) => (
              <TouchableOpacity key={index} style={styles.sizeChip}>
                <Text style={styles.sizeChipText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* KHỐI 5: PHƯƠNG THỨC THANH TOÁN */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <TouchableOpacity 
            style={styles.paymentSelectorBtn} 
            activeOpacity={0.7}
            onPress={() => setPaymentModalVisible(true)}
          >
            <View style={styles.paymentSelectorLeft}>
              <Ionicons name="wallet-outline" size={22} color="#B94A6E" />
              <Text style={styles.paymentSelectorText}>{getPaymentMethodName()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* ================= KHỐI 6: HÌNH THỨC GIAO NHẬN (4 THẺ LƯỚI TRỰC QUAN) ================= */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Hình thức giao nhận</Text>

          <View style={styles.deliveryGridRow}>
            {/* Thẻ 1 */}
            <TouchableOpacity 
              style={[styles.deliveryCardItem, deliveryType === 'home_home' && styles.deliveryCardActive]}
              onPress={() => setDeliveryType('home_home')}
            >
              <View style={[styles.deliveryIconCircle, deliveryType === 'home_home' && styles.deliveryIconCircleActive]}>
                <Ionicons name="home-outline" size={18} color={deliveryType === 'home_home' ? "#FFFFFF" : "#4B5563"} />
              </View>
              <Text style={[styles.deliveryCardText, deliveryType === 'home_home' && styles.deliveryCardTextActive]}>
                Giao nhận tại nhà
              </Text>
            </TouchableOpacity>

            {/* Thẻ 2 */}
            <TouchableOpacity 
              style={[styles.deliveryCardItem, deliveryType === 'home_post' && styles.deliveryCardActive]}
              onPress={() => setDeliveryType('home_post')}
            >
              <View style={[styles.deliveryIconCircle, deliveryType === 'home_post' && styles.deliveryIconCircleActive]}>
                <Ionicons name="business-outline" size={18} color={deliveryType === 'home_post' ? "#FFFFFF" : "#4B5563"} />
              </View>
              <Text style={[styles.deliveryCardText, deliveryType === 'home_post' && styles.deliveryCardTextActive]}>
                Giao tại nhà - Nhận tại bưu cục
              </Text>
            </TouchableOpacity>

            {/* Thẻ 3 */}
            <TouchableOpacity 
              style={[styles.deliveryCardItem, deliveryType === 'post_home' && styles.deliveryCardActive]}
              onPress={() => setDeliveryType('post_home')}
            >
              <View style={[styles.deliveryIconCircle, deliveryType === 'post_home' && styles.deliveryIconCircleActive]}>
                <Ionicons name="cube-outline" size={18} color={deliveryType === 'post_home' ? "#FFFFFF" : "#4B5563"} />
              </View>
              <Text style={[styles.deliveryCardText, deliveryType === 'post_home' && styles.deliveryCardTextActive]}>
                Giao tại bưu cục - Nhận tại nhà
              </Text>
            </TouchableOpacity>

            {/* Thẻ 4 */}
            <TouchableOpacity 
              style={[styles.deliveryCardItem, deliveryType === 'post_post' && styles.deliveryCardActive]}
              onPress={() => setDeliveryType('post_post')}
            >
              <View style={[styles.deliveryIconCircle, deliveryType === 'post_post' && styles.deliveryIconCircleActive]}>
                <Ionicons name="car-outline" size={18} color={deliveryType === 'post_post' ? "#FFFFFF" : "#4B5563"} />
              </View>
              <Text style={[styles.deliveryCardText, deliveryType === 'post_post' && styles.deliveryCardTextActive]}>
                Giao nhận tại bưu cục
              </Text>
            </TouchableOpacity>
          </View>

          {/* Hộp thông tin giá cước và nút TÙY CHỌN mở trang chi tiết */}
          <View style={styles.deliveryInfoBox}>
            <View style={styles.deliveryInfoRow}>
              <View style={styles.shieldBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.deliveryBoxTitle}>Giao hàng tiêu chuẩn</Text>
                <Text style={styles.deliveryBoxSub}>
                  Nhận hàng vào 13 thg 2.{' '}
                  <Text 
                    style={{ color: '#B94A6E', fontWeight: '700', textDecorationLine: 'underline' }}
                    onPress={() => {
                      setTempSelectedDelivery(deliveryType);
                      setShippingModalVisible(true); // Mở Modal phương thức vận chuyển chi tiết
                    }}
                  >
                    Tùy chọn
                  </Text>
                </Text>
              </View>
              <Text style={styles.deliveryBoxPrice}>{getDeliveryPrice(deliveryType)}</Text>
            </View>
          </View>
        </View>

        {/* KHỐI 7: DỊCH VỤ THÊM */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Dịch vụ thêm</Text>

          <TouchableOpacity 
            style={[styles.extraServiceCard, extraPackaging && styles.extraServiceCardSelected]} 
            onPress={() => setExtraPackaging(!extraPackaging)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, extraPackaging && styles.checkboxSelected]}>
              {extraPackaging && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </View>
            <Text style={styles.extraServiceName}>Dịch vụ đóng gói</Text>
            <Text style={styles.extraServiceFeeText}>
              Phí dịch vụ: <Text style={styles.extraServiceFeeBold}>+20,000đ</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.extraServiceCard, extraSms && styles.extraServiceCardSelected]} 
            onPress={() => setExtraSms(!extraSms)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, extraSms && styles.checkboxSelected]}>
              {extraSms && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </View>
            <Text style={styles.extraServiceName}>Thông báo qua SMS</Text>
            <Text style={styles.extraServiceFeeText}>
              Phí dịch vụ: <Text style={styles.extraServiceFeeBold}>+3,000đ</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* FOOTER THANH TOÁN CỐ ĐỊNH DƯỚI ĐÁY */}
      <View style={styles.footerBar}>
        <View style={styles.totalPriceRow}>
          <Text style={styles.totalLabel}>Tổng số tiền</Text>
          <Text style={styles.totalValue}>{getDeliveryPrice(deliveryType)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.submitOrderBtn} 
          activeOpacity={0.8} 
          onPress={() => setSuccessModalVisible(true)}
        >
          <Text style={styles.submitOrderBtnText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODAL TRANG CHỌN PHƯƠNG THỨC VẬN CHUYỂN (GIỐNG ẢNH MẪU YÊU CẦU) ================= */}
      <Modal
        visible={shippingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShippingModalVisible(false)}
      >
        <View style={styles.modalOverlayShipping}>
          <View style={styles.shippingModalContainer}>
            
            {/* Header Modal */}
            <View style={styles.shippingHeader}>
              <TouchableOpacity onPress={() => setShippingModalVisible(false)} style={styles.shippingBackBtn}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.shippingHeaderTitle}>Phương thức vận chuyển</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Các Tab tốc độ (Tiêu chuẩn / Nhanh / Siêu tốc) */}
            <View style={styles.shippingTabsRow}>
              <TouchableOpacity 
                style={[styles.shipTabItem, activeSpeedTab === 'standard' && styles.shipTabActive]}
                onPress={() => setActiveSpeedTab('standard')}
              >
                <Text style={[styles.shipTabText, activeSpeedTab === 'standard' && styles.shipTabTextActive]}>Tiêu chuẩn</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.shipTabItem, activeSpeedTab === 'fast' && styles.shipTabActive]}
                onPress={() => setActiveSpeedTab('fast')}
              >
                <Text style={[styles.shipTabText, activeSpeedTab === 'fast' && styles.shipTabTextActive]}>Nhanh</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.shipTabItem, activeSpeedTab === 'express' && styles.shipTabActive]}
                onPress={() => setActiveSpeedTab('express')}
              >
                <Text style={[styles.shipTabText, activeSpeedTab === 'express' && styles.shipTabTextActive]}>Siêu tốc</Text>
              </TouchableOpacity>
            </View>

            {/* Danh sách các hình thức vận chuyển dạng list */}
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
              
              {/* Option 1: Giao nhận tại nhà */}
              <TouchableOpacity 
                style={styles.shipOptionRow}
                onPress={() => setTempSelectedDelivery('home_home')}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.shipOptionTopRow}>
                    <Text style={styles.shipOptionName}>Giao nhận tại nhà</Text>
                    <Text style={styles.shipOptionPrice}>43.000đ</Text>
                  </View>
                  <Text style={styles.shipOptionSub}>Nhận hàng dự kiến lúc 12:12 12/03/2023</Text>
                </View>
                {tempSelectedDelivery === 'home_home' && (
                  <Ionicons name="checkmark" size={22} color="#B94A6E" style={{ marginLeft: 12 }} />
                )}
              </TouchableOpacity>

              {/* Option 2: Giao tại nhà - Nhận tại bưu cục */}
              <TouchableOpacity 
                style={styles.shipOptionRow}
                onPress={() => setTempSelectedDelivery('home_post')}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.shipOptionTopRow}>
                    <Text style={styles.shipOptionName}>Giao tại nhà - Nhận tại bưu cục</Text>
                    <Text style={styles.shipOptionPrice}>20.000đ</Text>
                  </View>
                  <Text style={styles.shipOptionSub}>Nhận hàng dự kiến lúc 12:12 12/03/2023</Text>
                </View>
                {tempSelectedDelivery === 'home_post' && (
                  <Ionicons name="checkmark" size={22} color="#B94A6E" style={{ marginLeft: 12 }} />
                )}
              </TouchableOpacity>

              {/* Option 3: Giao tại bưu cục - Nhận tại nhà */}
              <TouchableOpacity 
                style={styles.shipOptionRow}
                onPress={() => setTempSelectedDelivery('post_home')}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.shipOptionTopRow}>
                    <Text style={styles.shipOptionName}>Giao tại bưu cục - Nhận tại nhà</Text>
                    <Text style={styles.shipOptionPrice}>43.000đ</Text>
                  </View>
                  <Text style={styles.shipOptionSub}>Nhận hàng dự kiến lúc 12:12 12/03/2023</Text>
                </View>
                {tempSelectedDelivery === 'post_home' && (
                  <Ionicons name="checkmark" size={22} color="#B94A6E" style={{ marginLeft: 12 }} />
                )}
              </TouchableOpacity>

              {/* Option 4: Giao nhận tại bưu cục */}
              <TouchableOpacity 
                style={styles.shipOptionRow}
                onPress={() => setTempSelectedDelivery('post_post')}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.shipOptionTopRow}>
                    <Text style={styles.shipOptionName}>Giao nhận tại bưu cục</Text>
                    <Text style={styles.shipOptionPrice}>43.000đ</Text>
                  </View>
                  <Text style={styles.shipOptionSub}>Nhận hàng dự kiến lúc 12:12 12/03/2023</Text>
                </View>
                {tempSelectedDelivery === 'post_post' && (
                  <Ionicons name="checkmark" size={22} color="#B94A6E" style={{ marginLeft: 12 }} />
                )}
              </TouchableOpacity>

            </ScrollView>

            {/* Nút Xác nhận dưới cùng */}
            <View style={styles.shippingFooter}>
              <TouchableOpacity 
                style={styles.confirmShippingBtn}
                onPress={() => {
                  setDeliveryType(tempSelectedDelivery);
                  setShippingModalVisible(false);
                }}
              >
                <Text style={styles.confirmShippingBtnText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* ================= MODAL THÔNG BÁO ĐẶT HÀNG THÀNH CÔNG ================= */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlayCenter}>
          <View style={styles.successDialogCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.successDialogTitle}>Thành công</Text>
            <Text style={styles.successDialogDesc}>Đã tạo đơn hàng thành công!</Text>

            <TouchableOpacity 
              style={styles.successDialogBtn}
              onPress={() => {
                setSuccessModalVisible(false);
                router.back();
              }}
            >
              <Text style={styles.successDialogBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL CHỌN ĐỊA CHỈ & TÍCH HỢP MAP ================= */}
      <Modal
        visible={addressModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addressBottomSheet}>
            
            <View style={styles.addressModalHeader}>
              <TouchableOpacity onPress={() => setAddressModalVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <View style={styles.addressSearchBoxModal}>
                <Ionicons name="location-outline" size={16} color="#B94A6E" style={{ marginRight: 6 }} />
                <TextInput 
                  placeholder={activeAddressType === 'sender' ? 'Địa chỉ gửi hàng?' : 'Địa chỉ nhận hàng?'}
                  placeholderTextColor="#9CA3AF"
                  style={styles.addressSearchInputModal}
                  value={addressSearchQuery}
                  onChangeText={setAddressSearchQuery}
                />
              </View>
            </View>

            {/* Bấm vào đây sẽ mở Bản đồ trực tiếp */}
            <TouchableOpacity 
              style={styles.currentLocationRow}
              onPress={() => {
                setAddressModalVisible(false);
                setMapPickerModalVisible(true);
              }}
            >
              <View style={styles.locationPinBox}>
                <Ionicons name="location" size={16} color="#B94A6E" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.currentLocationTitle}>Sử dụng vị trí của tôi</Text>
                <Text style={styles.currentLocationSub} numberOfLines={1}>Chọn vị trí chính xác trên bản đồ Google Maps</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.addAddressRow}
              onPress={() => {
                setAddressModalVisible(false);
                router.push('/address');
              }}
            >
              <View style={styles.addPlusCircle}>
                <Ionicons name="add" size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.addAddressText}>Thêm địa chỉ</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
              {suggestedAddresses.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestedAddressItem}
                  onPress={() => {
                    if (activeAddressType === 'sender') {
                      setSenderAddress(prev => ({ ...prev, address: item.address }));
                    } else {
                      setReceiverAddress(prev => ({ ...prev, address: item.address }));
                    }
                    setAddressModalVisible(false);
                  }}
                >
                  <View style={styles.locationPinBoxGray}>
                    <Ionicons name="location" size={16} color="#9CA3AF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.suggestedTitle}>{item.title}</Text>
                    <Text style={styles.suggestedSub} numberOfLines={1}>{item.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

          </View>
        </View>
      </Modal>

      {/* ================= MODAL HIỂN THỊ BẢN ĐỒ MAPVIEWCOMPONENT ================= */}
      <Modal
        visible={mapPickerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMapPickerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.mapModalContainer}>
            <View style={styles.mapHeaderRow}>
              <TouchableOpacity style={styles.mapCloseBtn} onPress={() => setMapPickerModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.mapHeaderTitleText}>Chọn vị trí trên bản đồ</Text>
            </View>

            <View style={{ flex: 1 }}>
              <MapViewComponent />
            </View>

            <View style={styles.mapConfirmSheet}>
              <Text style={styles.mapSelectedTitle}>60A Trường Sơn, Phường 2, Tân Bình</Text>
              <Text style={styles.mapSelectedSub}>Vị trí hiện tại được chọn qua bản đồ</Text>
              
              <TouchableOpacity 
                style={styles.confirmMapBtn}
                onPress={() => {
                  const selectedLoc = '60A Trường Sơn, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh';
                  if (activeAddressType === 'sender') {
                    setSenderAddress(prev => ({ ...prev, address: selectedLoc }));
                  } else {
                    setReceiverAddress(prev => ({ ...prev, address: selectedLoc }));
                  }
                  setMapPickerModalVisible(false);
                }}
              >
                <Text style={styles.confirmMapBtnText}>Xác nhận vị trí này</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL CHỌN PHƯƠNG THỨC THANH TOÁN ================= */}
      <Modal
        visible={paymentModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setPaymentModalVisible(false)} activeOpacity={1} />
          
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={() => setPaymentModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Phương thức thanh toán</Text>
            </View>

            <View style={styles.sheetBody}>
              <Text style={styles.sheetSectionTitle}>Hình thức thanh toán khả dụng</Text>

              {/* 1. Tiền mặt */}
              <TouchableOpacity 
                style={[styles.paymentOption, paymentMethod === 'cash' && styles.paymentOptionSelected]}
                onPress={() => { setPaymentMethod('cash'); setPaymentModalVisible(false); }}
                activeOpacity={0.8}
              >
                <View style={styles.paymentIconBox}>
                  <View style={styles.cashIconMock}>
                    <Text style={styles.cashIconText}>$</Text>
                  </View>
                </View>
                <View style={styles.paymentTextWrap}>
                  <Text style={styles.paymentOptionTitle}>Tiền mặt</Text>
                  <Text style={styles.paymentOptionSub}>Thanh toán khi nhận hàng</Text>
                </View>
                {paymentMethod === 'cash' && (
                  <View style={styles.checkCorner}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" style={{ marginLeft: 2, marginBottom: 2 }} />
                  </View>
                )}
              </TouchableOpacity>

              {/* 2. Thẻ ATM */}
              <TouchableOpacity 
                style={[styles.paymentOption, paymentMethod === 'atm' && styles.paymentOptionSelected]}
                onPress={() => { setPaymentMethod('atm'); setPaymentModalVisible(false); }}
                activeOpacity={0.8}
              >
                <View style={styles.paymentIconBox}>
                  <MaterialCommunityIcons name="credit-card" size={28} color="#3B82F6" />
                </View>
                <View style={styles.paymentTextWrap}>
                  <Text style={styles.paymentOptionTitle}>Thẻ ATM</Text>
                  <Text style={styles.paymentOptionSub}>Hơn 40 ngân hàng trong nước</Text>
                </View>
                {paymentMethod === 'atm' && (
                  <View style={styles.checkCorner}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" style={{ marginLeft: 2, marginBottom: 2 }} />
                  </View>
                )}
              </TouchableOpacity>

              {/* 3. Thẻ tín dụng */}
              <TouchableOpacity 
                style={[styles.paymentOption, paymentMethod === 'credit' && styles.paymentOptionSelected]}
                onPress={() => { setPaymentMethod('credit'); setPaymentModalVisible(false); }}
                activeOpacity={0.8}
              >
                <View style={styles.paymentIconBox}>
                  <View style={styles.mastercardIcon}>
                    <View style={styles.mcCircleRed} />
                    <View style={styles.mcCircleYellow} />
                  </View>
                </View>
                <View style={styles.paymentTextWrap}>
                  <Text style={styles.paymentOptionTitle}>Thẻ tín dụng</Text>
                  <Text style={styles.paymentOptionSub}>Thẻ Visa, MasterCard, JCB, UnionPay</Text>
                </View>
                {paymentMethod === 'credit' && (
                  <View style={styles.checkCorner}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" style={{ marginLeft: 2, marginBottom: 2 }} />
                  </View>
                )}
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    backgroundColor: '#B94A6E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: { width: 30, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 120 },

  addressCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 20,
    position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  swapAddressBtn: { position: 'absolute', top: 16, right: 16, padding: 4 },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 4 },
  senderDotOuter: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#F97316',
    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2,
  },
  senderDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F97316' },
  addressTextContent: { flex: 1, paddingRight: 24 },
  addressHeading: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  personInfo: { fontSize: 12, fontWeight: '600', color: '#4B5563', marginBottom: 2 },
  fullAddress: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  connectorLineContainer: { paddingLeft: 8, marginVertical: 4 },
  dashedLineVertical: { height: 24, width: 1, borderWidth: 1, borderColor: '#D1D5DB', borderStyle: 'dashed' },

  sectionBlock: { marginBottom: 24 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  countBadge: {
    backgroundColor: '#1F2937', width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginLeft: 8,
  },
  countBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },

  productCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 12, marginBottom: 10,
  },
  productIconBox: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: '#B94A6E',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  productMainInfo: { flex: 1 },
  productTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  productQuantity: { fontSize: 14, fontWeight: '700', color: '#6B7280', marginRight: 6 },
  productName: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  categoryChip: { backgroundColor: '#FDF2F8', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  categoryChipText: { fontSize: 11, color: '#9CA3AF' },
  actionIconGroup: { flexDirection: 'row', gap: 12 },
  iconActionBtn: { padding: 4 },

  sectionHeaderAccordion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  pillToggleContainer: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 4, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB',
  },
  pillBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 20, gap: 6 },
  pillBtnActive: { backgroundColor: '#B94A6E' },
  pillBtnText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  pillBtnTextActive: { color: '#FFFFFF' },

  inputFormGroup: { marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6 },
  dropdownSelect: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 14, height: 46,
  },
  dropdownText: { fontSize: 14, color: '#9CA3AF' },
  textInput: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 12, paddingHorizontal: 14, height: 46, fontSize: 14, color: '#1F2937',
  },
  numberInputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 14, height: 46,
  },
  numberInput: { flex: 1, fontSize: 14, color: '#1F2937' },
  spinnerControls: { justifyContent: 'center', gap: 2 },

  addOrderOutlineBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#B94A6E', borderRadius: 12, height: 46, gap: 6, marginTop: 6, backgroundColor: '#FFFFFF',
  },
  addOrderOutlineBtnText: { color: '#B94A6E', fontSize: 14, fontWeight: '700' },

  dimensionsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  dimBox: { flex: 1, position: 'relative' },
  dimFloatingLabel: {
    position: 'absolute', top: -8, left: 12, backgroundColor: '#F8F9FA',
    paddingHorizontal: 4, fontSize: 10, color: '#6B7280', zIndex: 1,
  },
  dimInputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 10, height: 42,
  },
  dimInput: { flex: 1, fontSize: 13, color: '#1F2937' },
  dimUnit: { fontSize: 12, color: '#9CA3AF' },
  presetChipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sizeChip: { backgroundColor: '#E5E7EB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  sizeChipText: { fontSize: 12, color: '#4B5563', fontWeight: '500' },

  paymentSelectorBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB',
  },
  paymentSelectorLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentSelectorText: { fontSize: 15, fontWeight: '600', color: '#1F2937', marginLeft: 12 },

  /* --- STYLES CHO 4 THẺ GIAO NHẬN TRỰC QUAN --- */
  deliveryGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  deliveryCardItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'flex-start',
  },
  deliveryCardActive: {
    borderColor: '#B94A6E',
    backgroundColor: '#FDF2F8',
  },
  deliveryIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  deliveryIconCircleActive: {
    backgroundColor: '#B94A6E',
  },
  deliveryCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: 18,
  },
  deliveryCardTextActive: {
    color: '#B94A6E',
    fontWeight: '700',
  },
  deliveryInfoBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    padding: 14,
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shieldBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  deliveryBoxSub: {
    fontSize: 12,
    color: '#4B5563',
  },
  deliveryBoxPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },

  /* --- STYLES CHO MODAL CHỌN PHƯƠNG THỨC VẬN CHUYỂN CHI TIẾT --- */
  modalOverlayShipping: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shippingModalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shippingHeader: {
    backgroundColor: '#B94A6E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  shippingBackBtn: {
    width: 30,
    justifyContent: 'center',
  },
  shippingHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shippingTabsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  shipTabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  shipTabActive: {
    backgroundColor: '#FDF2F8',
    borderColor: '#FBCFE8',
  },
  shipTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  shipTabTextActive: {
    color: '#B94A6E',
    fontWeight: '700',
  },
  shipOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  shipOptionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  shipOptionName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  shipOptionPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B94A6E',
  },
  shipOptionSub: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  shippingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confirmShippingBtn: {
    backgroundColor: '#B94A6E',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmShippingBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  extraServiceCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, marginBottom: 10,
  },
  extraServiceCardSelected: { borderColor: '#B94A6E' },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1.5,
    borderColor: '#9CA3AF', marginRight: 10, alignItems: 'center', justifyContent: 'center',
  },
  checkboxSelected: { backgroundColor: '#B94A6E', borderColor: '#B94A6E' },
  extraServiceName: { flex: 1, fontSize: 13, fontWeight: '700', color: '#1F2937' },
  extraServiceFeeText: { fontSize: 12, color: '#6B7280' },
  extraServiceFeeBold: { color: '#B94A6E', fontWeight: '700' },

  footerBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  totalPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  totalValue: { fontSize: 16, fontWeight: '900', color: '#1F2937' },
  submitOrderBtn: {
    backgroundColor: '#B94A6E', height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  submitOrderBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  /* STYLES CHO MODAL BẢN ĐỒ TÍCH HỢP MAPVIEWCOMPONENT */
  mapModalContainer: { flex: 1, backgroundColor: '#E5E7EB', position: 'relative' },
  mapHeaderRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: 12, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB', zIndex: 10,
  },
  mapCloseBtn: { marginRight: 12 },
  mapHeaderTitleText: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  mapConfirmSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, elevation: 5,
  },
  mapSelectedTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  mapSelectedSub: { fontSize: 12, color: '#6B7280', marginBottom: 16 },
  confirmMapBtn: { backgroundColor: '#B94A6E', height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  confirmMapBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  /* STYLES MODAL THÔNG BÁO THÀNH CÔNG */
  modalOverlayCenter: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  successDialogCard: {
    width: '85%', maxWidth: 320, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5,
  },
  successIconCircle: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: '#10B981',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  successDialogTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  successDialogDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  successDialogBtn: {
    backgroundColor: '#B94A6E', width: '100%', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  successDialogBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  /* MODAL CHỌN ĐỊA CHỈ STYLES */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  addressBottomSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '90%',
  },
  addressModalHeader: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  addressSearchBoxModal: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6',
    borderRadius: 10, paddingHorizontal: 12, height: 40, marginLeft: 10,
  },
  addressSearchInputModal: { flex: 1, fontSize: 13, color: '#1F2937' },

  currentLocationRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F9FAFB',
  },
  locationPinBox: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#FDF2F8',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  currentLocationTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  currentLocationSub: { fontSize: 12, color: '#6B7280' },

  addAddressRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 8, borderBottomColor: '#F3F4F6',
  },
  addPlusCircle: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#B94A6E',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  addAddressText: { fontSize: 14, fontWeight: '700', color: '#B94A6E' },

  suggestedAddressItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F9FAFB',
  },
  locationPinBoxGray: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  suggestedTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  suggestedSub: { fontSize: 12, color: '#9CA3AF' },

  /* MODAL THANH TOÁN STYLES */
  bottomSheet: { backgroundColor: '#F8F9FA', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  closeBtn: { padding: 4 },
  sheetTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#1F2937', marginRight: 32 },
  sheetBody: { padding: 16 },
  sheetSectionTitle: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 12 },
  paymentOption: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', position: 'relative', overflow: 'hidden',
  },
  paymentOptionSelected: { borderColor: '#B94A6E' },
  paymentIconBox: { width: 40, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  paymentTextWrap: { flex: 1 },
  paymentOptionTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  paymentOptionSub: { fontSize: 12, color: '#9CA3AF' },
  checkCorner: {
    position: 'absolute', top: 0, right: 0, backgroundColor: '#B94A6E', width: 24, height: 24, borderBottomLeftRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  cashIconMock: { width: 24, height: 18, backgroundColor: '#10B981', borderRadius: 3, alignItems: 'center', justifyContent: 'center' },
  cashIconText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  mastercardIcon: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  mcCircleRed: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#EF4444', zIndex: 1 },
  mcCircleYellow: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#F59E0B', marginLeft: -8 },
});