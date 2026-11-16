
export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",

      globals: {
        console: "readonly"
      }
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];
