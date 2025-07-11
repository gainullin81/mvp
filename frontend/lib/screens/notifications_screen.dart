import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  List<Map<String, dynamic>> notifications = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchNotifications();
  }

  Future<void> fetchNotifications() async {
    setState(() { loading = true; error = null; });
    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final token = authProvider.token ?? '';
      
      final response = await Dio().get(
        'http://localhost:3000/notifications',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      
      setState(() {
        notifications = List<Map<String, dynamic>>.from(response.data);
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = 'Ошибка загрузки уведомлений';
        loading = false;
      });
    }
  }

  Color _getNotificationColor(String type) {
    switch (type.toLowerCase()) {
      case 'stock_in':
        return Colors.green;
      case 'stock_out':
        return Colors.red;
      case 'low_stock':
        return Colors.orange;
      default:
        return Colors.blue;
    }
  }

  IconData _getNotificationIcon(String type) {
    switch (type.toLowerCase()) {
      case 'stock_in':
        return Icons.add_shopping_cart;
      case 'stock_out':
        return Icons.remove_shopping_cart;
      case 'low_stock':
        return Icons.warning;
      default:
        return Icons.notifications;
    }
  }

  String _getNotificationTitle(String type) {
    switch (type.toLowerCase()) {
      case 'stock_in':
        return 'Пополнение склада';
      case 'stock_out':
        return 'Списание товара';
      case 'low_stock':
        return 'Низкий остаток';
      default:
        return 'Уведомление';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Уведомления'),
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: fetchNotifications,
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
                        onPressed: fetchNotifications,
                        child: const Text('Повторить'),
                      ),
                    ],
                  ),
                )
              : notifications.isEmpty
                  ? const Center(
                      child: Text('Уведомлений нет'),
                    )
                  : RefreshIndicator(
                      onRefresh: fetchNotifications,
                      child: ListView.builder(
                        itemCount: notifications.length,
                        itemBuilder: (context, index) {
                          final notification = notifications[index];
                          final color = _getNotificationColor(notification['type'] ?? '');
                          final icon = _getNotificationIcon(notification['type'] ?? '');
                          final title = _getNotificationTitle(notification['type'] ?? '');
                          
                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                            child: ListTile(
                              leading: CircleAvatar(
                                backgroundColor: color,
                                child: Icon(icon, color: Colors.white),
                              ),
                              title: Text(title),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(notification['message'] ?? ''),
                                  if (notification['product'] != null)
                                    Text('Товар: ${notification['product']['name']}'),
                                  Text('Дата: ${_formatDate(notification['createdAt'])}'),
                                ],
                              ),
                              trailing: notification['read'] == true
                                  ? const Icon(Icons.check_circle, color: Colors.grey)
                                  : Container(
                                      width: 12,
                                      height: 12,
                                      decoration: const BoxDecoration(
                                        color: Colors.red,
                                        shape: BoxShape.circle,
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