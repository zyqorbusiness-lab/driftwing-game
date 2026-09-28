# Driftwing
An original, one-touch sky-runner. Tap, click, Space or Up to lift; pass between moving gates. Score and best score are local to your device. Pause with the on-screen control, P or Escape. No accounts, ads, analytics, or API keys. Game and art are original. No audio is enabled.

## Web
Static site: serve the repository root over HTTPS for offline install. To test locally: `python3 -m http.server 8000` and visit http://localhost:8000.

## Android
The `android/` project packages the same game locally inside a native WebView. The GitHub Action builds a debug APK on every push to main. Debug APKs are installable for testing but not signed for Play Store distribution. The APK does not require network permission.
