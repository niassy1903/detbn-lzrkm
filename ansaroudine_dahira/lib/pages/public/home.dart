import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/data_context.dart';
import '../../context/auth_context.dart';
import '../../components/common/public_navbar.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final auth = Provider.of<AuthContext>(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          RefreshIndicator(
            onRefresh: () => data.refreshData(auth.user?.role.name),
            child: ListView.builder(
              controller: _scrollController,
              padding: EdgeInsets.zero,
              itemCount: data.events.length + 1, // +1 for hero space
              itemBuilder: (context, index) {
                if (index == 0) {
                  return Container(
                    height: 400,
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFF10B981), Colors.green],
                      ),
                    ),
                    child: Center(
                      child: Text(
                        'Dahira Ansaroudine',
                        style: Theme.of(context).textTheme.displaySmall?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  );
                }
                
                final event = data.events[index - 1];
                final hasImage = event.image != null && event.image!.isNotEmpty;
                return Card(
                  margin: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (hasImage)
                        Image.network(
                          event.image!,
                          height: 200,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(event.title, style: Theme.of(context).textTheme.headlineSmall),
                            const SizedBox(height: 8),
                            Text(event.description, maxLines: 2, overflow: TextOverflow.ellipsis),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: PublicNavbar(
              isHome: true,
              scrollController: _scrollController,
            ),
          ),
        ],
      ),
    );
  }
}
