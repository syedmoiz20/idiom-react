const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.extraNodeModules = {
  stream: require.resolve("readable-stream"),
  crypto: require.resolve("react-native-crypto-js"),
};
module.exports = defaultConfig;
