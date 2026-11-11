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

## Folder structure

```text
src/
  app/          Routes for Expo Router. Only screens and layouts.
  components/   UI components shared by several features.
  features/     Code for one feature, e.g. features/route-planning.
  lib/          Code without UI, e.g. the API client and helpers.
__tests__/      Tests for routes. Other tests sit next to their code.
```

Create a folder when it gets its first file. Import code from `src` with the
`@/` alias, e.g. `import { Button } from '@/components/button'`, instead of
long relative paths. The alias is set in `tsconfig.json`; Metro, Jest and
ESLint read it from there.

## Routing

The app uses [Expo Router](https://docs.expo.dev/router/introduction/). Every
file in `src/app` is a screen. `src/app/_layout.tsx` is the root layout and
`src/app/index.tsx` is the start screen. Typed routes are enabled, so
`expo start` generates route types in `.expo/types`.

## Tests

Tests use [Jest](https://jestjs.io/) with the `jest-expo` preset and
[React Native Testing Library](https://oss.callstack.com/react-native-testing-library/).
Put test files next to the code as `*.test.tsx` or in a `__tests__` folder,
but not inside `src/app`, because Expo Router treats every file there as a
route. To test routes, use `renderRouter` from `expo-router/testing-library`.

```sh
npm test            # run once
npm run test:watch  # rerun on file changes
npm run test:ci     # CI mode with coverage report in coverage/
```

## Expo template attribution

This app includes code and assets from [Expo's blank TypeScript template](https://github.com/expo/expo/tree/main/templates/expo-template-blank-typescript).
