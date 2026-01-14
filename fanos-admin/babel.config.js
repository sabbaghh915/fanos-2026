module.exports = {
    presets: [
      "@babel/preset-env",  // This preset is for compiling ES2015+ syntax
      "@babel/preset-react" // This preset is for compiling React JSX
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties" // This plugin allows handling of class properties
    ]
  };
  