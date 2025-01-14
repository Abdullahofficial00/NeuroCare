import 'package:flutter/material.dart';

// Colors
const Color primaryColor = Colors.blueAccent;
const Color secondaryColor = Colors.white;
const Color backgroundColor = Colors.blueGrey;
const Color textColor = Colors.black87;

// Font Styles
const TextStyle headingStyle = TextStyle(
  fontSize: 24,
  fontWeight: FontWeight.bold,
  color: primaryColor,
);

const TextStyle subheadingStyle = TextStyle(
  fontSize: 18,
  fontWeight: FontWeight.w600,
  color: textColor,
);

const TextStyle bodyTextStyle = TextStyle(
  fontSize: 16,
  fontWeight: FontWeight.normal,
  color: textColor,
);

// Button Styles
final ButtonStyle elevatedButtonStyle = ElevatedButton.styleFrom(
  backgroundColor: primaryColor,
  padding: EdgeInsets.symmetric(vertical: 12.0, horizontal: 24.0),
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(10),
  ),
  foregroundColor: Colors.white, // Button text color
);
