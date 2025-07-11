import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class SalesProvider extends ChangeNotifier {
  Future<bool> sendSale({
    required int userId,
    required int productId,
    required int quantity,
    required String token,
  }) async {
    try {
      final response = await Dio().post(
        'http://localhost:3000/orders',
        data: {
          'userId': userId,
          'productId': productId,
          'quantity': quantity,
        },
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
} 