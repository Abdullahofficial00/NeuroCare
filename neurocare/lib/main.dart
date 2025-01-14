import 'package:flutter/material.dart';
import 'package:neurocare/pages/intro_page.dart';  // Import the IntroPage
import 'package:neurocare/pages/sign_up_page.dart';  // Import the SignUpPage
import 'package:neurocare/pages/sign_in_page.dart';  // Import the SignInPage
// import other necessary pages here...

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NeuroCare',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: '/',  // Set initial route to '/'
      routes: {
        '/': (context) => IntroPage(),  // Link IntroPage here
        '/signUp': (context) => SignUpPage(),
        '/signIn': (context) => SignInPage(),
        // Add other routes here...
      },
    );
  }
}
