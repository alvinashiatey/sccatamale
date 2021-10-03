const { dest, src } = require("gulp");
const sourceMaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const jsWATCH = "./src/static/js/**/*.js";
let distPath = "./_site/static/js";
const isProduction = process.env.NODE_ENV === "production";
let webpackConfigPath = "../webpack.config.js";
if (isProduction) {
  webpackConfigPath = "../webpack.config.prod.js";
}

const js = () => {
  return src(jsWATCH)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(webpack(require(webpackConfigPath)))
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(uglify())
    .pipe(sourceMaps.write(".", { sourceMappingURL: "main.js.map" }))
    .pipe(dest(distPath));
};

module.exports = js;
