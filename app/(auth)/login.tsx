import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';

const PINK_PRIMARY = '#B94A6E'; // Tone màu chủ đạo của app

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); // Thêm state lưu thông tin email/số điện thoại

  const handleLogin = () => {
    // Lấy phần chữ đứng trước @ làm tên hiển thị, nếu để trống mặc định là 'Swift247 User'
    const displayName = email ? email.split('@')[0] : 'Swift247 User';
    
    // Chuyển hướng sang trang home và truyền tham số name động
    router.replace({
      pathname: '/(tabs)/home',
      params: { name: displayName }
    });
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView 
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

          {/* Nút Quay lại */}
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.dark} />
          </TouchableOpacity>

          {/* Header Nhận diện thương hiệu */}
          <View style={styles.headerContainer}>
            <View style={styles.miniLogo}>
              <Ionicons name="cube-outline" size={28} color={PINK_PRIMARY} />
            </View>
            <Text style={styles.title}>Chào mừng trở lại! 👋</Text>
            <Text style={styles.subtitle}>Nhập thông tin tài khoản Swift247 của bạn để tiếp tục</Text>
          </View>

          {/* Form Nhập liệu */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email hoặc Số điện thoại</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput 
                  placeholder="name@example.com" 
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail} // Gắn state vào TextInput
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Nhập mật khẩu của bạn" 
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* Khu vực Nút bấm hành động */}
          <View style={styles.footerContainer}>
            <TouchableOpacity 
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={handleLogin} // Gọi hàm xử lý đăng nhập động
            >
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

// Helper nhỏ để bọc an toàn màn hình tránh tai thỏ
function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  return <View style={styles.safeArea}>{children}</View>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 32,
  },
  miniLogo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FDF2F8', // Nền hồng nhạt đồng bộ
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  formContainer: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    color: PINK_PRIMARY,
    fontWeight: '600',
    fontSize: 14,
  },
  footerContainer: {
    width: '100%',
    gap: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: PINK_PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: PINK_PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: PINK_PRIMARY,
    fontWeight: '700',
    fontSize: 14,
  },
});