import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// --- HƯỚNG DẪN ĐỔI ẢNH MẶC ĐỊNH ---
// Bạn thay đổi đường dẫn URL dưới đây thành link ảnh bạn muốn đặt làm mặc định
const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';

export default function ProfileScreen() {
  const router = useRouter();

  // State lưu trữ đường dẫn ảnh đại diện
  const [avatarUri, setAvatarUri] = useState<string>(DEFAULT_AVATAR_URL);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    // Xin quyền truy cập thư viện ảnh trên thiết bị
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập thư viện ảnh để thay đổi hình đại diện!');
      return;
    }

    // Mở thư viện chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Cho phép cắt ảnh
      aspect: [1, 1],      // Tỷ lệ vuông cho Avatar
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* KHỐI HEADER THÔNG TIN NGƯỜI DÙNG */}
        <View style={styles.headerSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
            />
            {/* Nút bấm Đổi ảnh đại diện */}
            <TouchableOpacity 
              style={styles.cameraBtn} 
              onPress={pickImage} 
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Karly Le</Text>
          <Text style={styles.userEmail}>karly.le@swift247.com</Text>
        </View>

        {/* KHỐI 1: VÍ VÀ SỔ ĐỊA CHỈ */}
        <View style={styles.menuBlock}>
          {/* Ví của tôi */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="wallet-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>Ví của tôi</Text>
            <Text style={styles.walletValue}>4.568đ</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* Sổ địa chỉ */}
          <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.7} 
            onPress={() => router.push('/address')}
          >
            <View style={styles.iconBox}>
              <Ionicons name="book-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>Sổ địa chỉ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blockSeparator} />

        {/* KHỐI 2: VỊ TRÍ VÀ NGÔN NGỮ */}
        <View style={styles.menuBlock}>
          {/* Bạn đang ở Việt Nam */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="navigate-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>
              Bạn đang ở <Text style={styles.highlightText}>Việt Nam</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* Ngôn ngữ */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="language-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>Ngôn ngữ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blockSeparator} />

        {/* KHỐI 3: HỖ TRỢ VÀ CÀI ĐẶT */}
        <View style={styles.menuBlock}>
          {/* Tổng đài */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="headset-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>
              Tổng đài <Text style={styles.highlightText}>1900272727</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* Hỗ trợ */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="help-circle-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>Hỗ trợ</Text>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* Cài đặt */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name="settings-outline" size={20} color="#BE185D" />
            </View>
            <Text style={styles.menuLabel}>Cài đặt</Text>
          </TouchableOpacity>
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

  /* HEADER PROFILE */
  headerSection: {
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 28,
  },
  avatarWrapper: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cameraBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#BE185D', // Màu nút máy ảnh
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* MENU BLOCK */
  menuBlock: {
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FDF2F8', // Nền hồng nhạt theo màu gốc
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  walletValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  highlightText: {
    color: '#BE185D', // Màu hồng nổi bật
    fontWeight: '700',
  },

  /* KHU VỰC PHÂN CÁC KHỐI */
  itemDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 72,
  },
  blockSeparator: {
    height: 10,
    backgroundColor: '#F3F4F6',
  },
});