# Entlang mobile

Expo and React Native app for Android and iOS.

## Prerequisites

- Use the Node.js version in the repository root's `.nvmrc`.
- Use an Android device or emulator, or an iOS device or simulator. The iOS
  simulator requires macOS and Xcode.
- Install a version of Expo Go that supports the SDK version in `package.json`.
  See [Expo's installation guidance](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/)
  for the target device. On a physical iPhone, availability of a compatible Expo
  Go build may depend on the App Store or TestFlight. A development build is
  another option. An iOS simulator can install a compatible Expo Go build from
  [expo.dev/go](https://expo.dev/go).

## Install and start

From `apps/mobile`:

```sh
npm ci
npm start
```

Scan the QR code with Expo Go on Android or with the Camera app on iOS. The
computer and phone should be on the same network. With a running emulator or
simulator, use `npm run android` or `npm run ios` instead.

## Checks

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
```

Use `npm run lint:fix` or `npm run format` to apply fixes when needed.

## Tests

Tests use [Jest](https://jestjs.io/) with the `jest-expo` preset and
[React Native Testing Library](https://oss.callstack.com/react-native-testing-library/).
Put test files next to the code as `*.test.tsx` or in a `__tests__` folder.

```sh
npm test            # run once
npm run test:watch  # rerun on file changes
npm run test:ci     # CI mode with coverage report in coverage/
```

## Expo template attribution

This app includes code and assets from [Expo's blank TypeScript template](https://github.com/expo/expo/tree/main/templates/expo-template-blank-typescript).
