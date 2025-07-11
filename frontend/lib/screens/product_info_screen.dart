import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:provider/provider.dart';
import '../providers/sales_provider.dart';
import '../providers/auth_provider.dart';

class ProductInfoScreen extends StatefulWidget {
  final String code;
  const ProductInfoScreen({super.key, required this.code});

  @override
  State<ProductInfoScreen> createState() => _ProductInfoScreenState();
}

class _ProductInfoScreenState extends State<ProductInfoScreen> {
  Map<String, dynamic>? product;
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchProduct();
  }

  Future<void> fetchProduct() async {
    setState(() { loading = true; error = null; });
    try {
      // Предполагается, что code — это id товара
      final response = await Dio().get('http://localhost:3000/products/${widget.code}');
      setState(() {
        product = response.data;
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = 'Товар не найден или ошибка сервера';
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Информация о товаре')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(child: Text(error!))
              : product == null
                  ? const Center(child: Text('Нет данных'))
                  : Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Название: ${product!['name']}', style: const TextStyle(fontSize: 20)),
                          if (product!['description'] != null)
                            Text('Описание: ${product!['description']}'),
                          Text('Цена: ${product!['price']}'),
                          const SizedBox(height: 24),
                          ElevatedButton(
                            onPressed: () async {
                              final quantityController = TextEditingController();
                              final result = await showDialog<int>(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: const Text('Введите количество'),
                                  content: TextField(
                                    controller: quantityController,
                                    keyboardType: TextInputType.number,
                                    decoration: const InputDecoration(labelText: 'Количество'),
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context),
                                      child: const Text('Отмена'),
                                    ),
                                    TextButton(
                                      onPressed: () {
                                        final qty = int.tryParse(quantityController.text);
                                        if (qty != null && qty > 0) {
                                          Navigator.pop(context, qty);
                                        }
                                      },
                                      child: const Text('OK'),
                                    ),
                                  ],
                                ),
                              );
                              if (result != null) {
                                // Получаем userId и token из AuthProvider
                                final authProvider = Provider.of<AuthProvider>(context, listen: false);
                                final salesProvider = Provider.of<SalesProvider>(context, listen: false);
                                final userId = authProvider.userId ?? 1;
                                final token = authProvider.token ?? '';
                                final success = await salesProvider.sendSale(
                                  userId: userId,
                                  productId: product!['id'],
                                  quantity: result,
                                  token: token,
                                );
                                if (success) {
                                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Продажа отправлена!')));
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Ошибка продажи')));
                                }
                              }
                            },
                            child: const Text('Продать'),
                          ),
                        ],
                      ),
                    ),
    );
  }
} 