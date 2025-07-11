import 'package:flutter/material.dart';
import '../api_client.dart';

class SalesProvider extends ChangeNotifier {
  Future<bool> sendSale(int userId, int productId, int quantity) async {
    return await ApiClient().postSale(userId, productId, quantity);
  }

  Future<List<dynamic>> getOrderHistory() async {
    return await ApiClient().getOrderHistory();
  }
} 