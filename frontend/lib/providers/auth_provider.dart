import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class AuthProvider extends ChangeNotifier {
  String? token;
  String? role;
  int? userId;
  String? userEmail;

  Future<bool> login(String email, String password, String selectedRole) async {
    try {
      final response = await Dio().post(
        'http://127.0.0.1:3000/auth/login',
        data: {'email': email, 'password': password},
      );
      token = response.data['access_token'];
      role = response.data['user']['role'];
      userId = response.data['user']['id'];
      userEmail = response.data['user']['email'];
      // Можно добавить проверку на совпадение выбранной роли
      notifyListeners();
      return true;
    } catch (e) {
      return false;
    }
  }
} 