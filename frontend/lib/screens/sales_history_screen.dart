import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class SalesHistoryScreen extends StatefulWidget {
  const SalesHistoryScreen({super.key});

  @override
  State<SalesHistoryScreen> createState() => _SalesHistoryScreenState();
}

class _SalesHistoryScreenState extends State<SalesHistoryScreen> {
  List<Map<String, dynamic>> sales = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchSalesHistory();
  }

  Future<void> fetchSalesHistory() async {
    setState(() { loading = true; error = null; });
    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final token = authProvider.token ?? '';
      
      final response = await Dio().get(
        'http://localhost:3000/orders',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      
      setState(() {
        sales = List<Map<String, dynamic>>.from(response.data);
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = 'Ошибка загрузки истории продаж';
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('История продаж'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: fetchSalesHistory,
          ),
        ],
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(error!, style: const TextStyle(color: Colors.red)),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: fetchSalesHistory,
                        child: const Text('Повторить'),
                      ),
                    ],
                  ),
                )
              : sales.isEmpty
                  ? const Center(
                      child: Text('История продаж пуста'),
                    )
                  : RefreshIndicator(
                      onRefresh: fetchSalesHistory,
                      child: ListView.builder(
                        itemCount: sales.length,
                        itemBuilder: (context, index) {
                          final sale = sales[index];
                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                            child: ListTile(
                              leading: const Icon(Icons.shopping_cart, color: Colors.green),
                              title: Text(sale['product']?['name'] ?? 'Неизвестный товар'),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Количество: ${sale['quantity']}'),
                                  Text('Цена: ${sale['product']?['price'] ?? 0} ₽'),
                                  Text('Дата: ${_formatDate(sale['createdAt'])}'),
                                ],
                              ),
                              trailing: Text(
                                '${(sale['quantity'] * (sale['product']?['price'] ?? 0)).toStringAsFixed(2)} ₽',
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null) return 'Неизвестно';
    try {
      final date = DateTime.parse(dateString);
      return '${date.day.toString().padLeft(2, '0')}.${date.month.toString().padLeft(2, '0')}.${date.year} ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
    } catch (e) {
      return 'Неизвестно';
    }
  }
} 