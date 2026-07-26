# Safe im Netz App

Source code of the **Safe im Netz** app.

## Development

This project uses Expo SDK 57 with Continuous Native Generation. The native
projects are generated locally and are intentionally not committed.

```sh
npm install
npm run prebuild
npm run ios
npm run android
```

Use `npm run prebuild:clean` after changing native configuration in `app.json`.
