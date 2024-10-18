import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";

export default [
  {
    ignores: [
      ".yarn/",
      "dist/",
      ".pnp.cjs"
    ]
  },
  ...pluginVue.configs['flat/recommended'],
  js.configs.recommended,
  eslintConfigPrettier,
]
