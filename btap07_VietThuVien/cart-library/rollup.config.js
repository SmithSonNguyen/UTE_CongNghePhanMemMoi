import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [
  // Build JS bundles
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        jsx: "react-jsx",
        declaration: true,
        declarationDir: "dist/types",
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Build declarations
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/], // Loại trừ CSS nếu có
  },
];
