import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'main_menu_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String selectedRole = 'SELLER';

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Вход')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: emailController, decoration: const InputDecoration(labelText: 'Email')),
            TextField(controller: passwordController, decoration: const InputDecoration(labelText: 'Пароль'), obscureText: true),
            DropdownButton<String>(
              value: selectedRole,
              items: const [
                DropdownMenuItem(value: 'SELLER', child: Text('Продавец')),
                DropdownMenuItem(value: 'SUPPLIER', child: Text('Поставщик')),
                DropdownMenuItem(value: 'DIRECTOR', child: Text('Директор')),
              ],
              onChanged: (value) => setState(() => selectedRole = value!),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () async {
                final success = await authProvider.login(
                  emailController.text,
                  passwordController.text,
                  selectedRole,
                );
                if (success) {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => const MainMenuScreen()),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Ошибка входа')));
                }
              },
              child: const Text('Войти'),
            ),
          ],
        ),
      ),
    );
  }
} 