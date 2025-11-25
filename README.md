# Mekanova

This is a cross-platform venue discovery and reservation app built with Expo (React Native) and Supabase.

## Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd mekanova
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

Replace `"YOUR_SUPABASE_URL"` and `"YOUR_SUPABASE_ANON_KEY"` with your actual Supabase project credentials.

### Running the App

-   To run the app on the web:
    ```bash
    npx expo start --web
    ```
-   To run the app on an Android emulator or device:
    ```bash
    npx expo start --android
    ```
-   To run the app on an iOS simulator or device:
    ```bash
    npx expo start --ios
    ```
