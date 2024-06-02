module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          "@/components": "./src/components",
          "@/assets": "./src/assets",
          "@/enums": "./src/enums",
          "@/translations": "./src/translations",
          "@/types": "./src/types",
          "@/utils": "./src/utils",
          "@/views": "./src/views",
        }
      },
    ],
    'react-native-reanimated/plugin',
  ]
};