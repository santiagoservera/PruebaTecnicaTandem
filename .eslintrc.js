module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // activa prettier como regla de ESLint
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // tus reglas personalizadas
    "vue/multi-word-component-names": "off", // desactiva la regla para nombres como "Home.vue"
    "@typescript-eslint/no-explicit-any": "warn",
    "prettier/prettier": ["error"],
  },
};
