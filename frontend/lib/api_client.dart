import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;
  late Dio dio;

  ApiClient._internal() {
    dio = Dio(BaseOptions(baseUrl: 'http://localhost:3000'));
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
    ));
  }

  Future<String?> login(String email, String password) async {
    final response = await dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    final token = response.data['access_token'];
    if (token != null) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);
    }
    return token;
  }

  Future<List<dynamic>> getProducts() async {
    final response = await dio.get('/products');
    return response.data;
  }

  Future<bool> postSale(int userId, int productId, int quantity) async {
    final response = await dio.post('/orders', data: {
      'userId': userId,
      'productId': productId,
      'quantity': quantity,
    });
    return response.statusCode == 201 || response.statusCode == 200;
  }

  Future<List<dynamic>> getOrderHistory() async {
    final response = await dio.get('/orders');
    return response.data;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }
} 