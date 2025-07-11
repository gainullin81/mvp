import 'package:flutter/material.dart';
import '../api_client.dart';

class AuthProvider extends ChangeNotifier {
  String? token;

  Future<bool> login(String email, String password) async {
    token = await ApiClient().login(email, password);
    notifyListeners();
    return token != null;
  }

  Future<void> logout() async {
    await ApiClient().logout();
    token = null;
    notifyListeners();
  }
} 