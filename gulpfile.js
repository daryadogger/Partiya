//common
const gulp = require(`gulp`);
const del = require(`del`);
const rename = require(`gulp-rename`);
const sourcemaps = require(`gulp-sourcemaps`);
const plumber = require(`gulp-plumber`);
const server = require(`browser-sync`).create();

//styles
const sass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const objectFit = require(`postcss-object-fit-images`);
const minify = require(`gulp-csso`);

//images
const imagemin = require(`gulp-imagemin`);
const mozjpeg = require(`imagemin-mozjpeg`);
const svgstore = require(`gulp-svgstore`);

//js
const rollup = require(`gulp-better-rollup`);
const babel = require(`rollup-plugin-babel`);
const uglify = require(`gulp-uglify`);
const nodeResolve = require(`rollup-plugin-node-resolve`);
const commonjs = require(`rollup-plugin-commonjs`);
const terser = require(`rollup-plugin-terser`).terser;
const concat = require(`gulp-concat`);

//html
const pug = require(`gulp-pug`);
const format = require(`gulp-format-html`);

const config = {
  dist: `build`,
  src: `src`,
  img: `src/img/**/*.{png,jpg,svg,ico}`,
  html: `src/*.html`,
  libs: `src/libs/**/*.{js,css}`,
  css: {
    src: `src/sass/style.scss`,
    watch: `src/sass/**/*.scss`,
    dist: `build/css`,
    min: `style.min.css`
  },
  custom: {
    src: `src/sass/custom.css`,
    dist: `build/css`,
  },
  sprite: {
    src: `src/img/icons-sprite/*.svg`,
    dist: `build/img/sprite`,
    name: `sprite.svg`
  },
  js: {
    src: `src/js/main.js`,
    srcLibs: `src/libs/**/*.js`,
    watch: `src/js/**/*.js`,
    mode: `iife`,
    dist: `build/js/`,
    distLibs: `build/js/`
  },
  pug: {
    views: `src/views/*.pug`,
    components: `src/views/**/*.pug`
  },
  svg: {
    src: `src/img/icons/*.svg`,
    dist: `build/img`
  }
};

gulp.task(`clean`, () => {
  return del(config.dist);
});

gulp.task(`copy`, () => {
  return gulp
    .src([config.svg.src, config.img], {
      base: config.src
    })
    .pipe(gulp.dest(config.dist));
});

gulp.task(`style`, () => {
  return gulp
    .src(config.css.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      objectFit()
    ]))
    // .pipe(gulp.dest(config.css.dist))
    .pipe(minify())
    .pipe(rename(config.css.min))
    .pipe(gulp.dest(config.css.dist));
});

gulp.task(`styleDev`, () => {
  return gulp
    .src(config.css.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      objectFit()
    ]))
    .pipe(gulp.dest(config.css.dist))
    .pipe(rename(config.css.min))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css.dist))
    .pipe(server.stream());
});

gulp.task(`customCss`, () => {
  return gulp
    .src(config.custom.src)
    .pipe(gulp.dest(config.custom.dist));
});

gulp.task(`sprite`, () => {
  return gulp
    .src([config.sprite.src])
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename(config.sprite.name))
    .pipe(gulp.dest(config.sprite.dist));
});

gulp.task(`copyHtml`, () => {
  return gulp
    .src(config.html)
    .pipe(gulp.dest(config.dist));
});

gulp.task(`scripts`, () => {
  return gulp
    .src(config.js.src)
    .pipe(plumber())
    .pipe(
      rollup(
        {
          plugins: [
            commonjs(),
            nodeResolve(),
            babel({
              exclude: ['node_modules/**'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      browsers: '> 0.25%, not dead'
                    }
                  }
                ]
              ]
            }),
            terser()
          ]
        },
        config.js.mode
      )
    )
    .pipe(plumber())
    .pipe(gulp.dest(config.js.dist));
});

gulp.task(`scriptsDev`, () => {
  return gulp
    .src(config.js.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [
            commonjs(),
            nodeResolve(),
            babel({
              exclude: ['node_modules/**'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      browsers: '> 0.25%, not dead'
                    }
                  }
                ]
              ]
            }),
          ]
        },
        config.js.mode
      )
    )
    .pipe(sourcemaps.write())
    .pipe(plumber())
    .pipe(gulp.dest(config.js.dist));
});

gulp.task(`scriptsLibs`, () => {
  return gulp
    .src(config.js.srcLibs)
    .pipe(plumber())
    .pipe(concat(`vendor.js`))
    .pipe(uglify())
    .pipe(rename({suffix: `.min`}))
    .pipe(gulp.dest(config.js.distLibs));
});

gulp.task(`pug`, () => {
  return gulp
    .src(config.pug.views)
    .pipe(pug())
    .pipe(format())
    .pipe(gulp.dest(config.dist));
});

gulp.task(`image`, () => {
  return gulp
    .src(config.img)
    .pipe(imagemin(mozjpeg({
      quality: 75,
      progressive: true,
    })))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`serve`, () => {
  server.init({
    server: config.dist,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch(config.css.watch, gulp.series(`styleDev`));
  gulp.watch(config.img, gulp.series(`image`)).on(`change`, server.reload);
  gulp.watch(config.html, gulp.series(`copyHtml`)).on(`change`, server.reload);
  gulp.watch(config.pug.components, gulp.series(`pug`)).on(`change`, server.reload);
  gulp.watch(config.js.watch, gulp.series(`scriptsDev`)).on(`change`, server.reload);
});

gulp.task(`build`, gulp.series(
  `clean`,
  `copy`,
  `image`,
  `style`,
  `customCss`,
  `sprite`,
  `scriptsDev`,
  `scriptsLibs`,
  `pug`,
  (done) => done())
);

gulp.task(`buildDev`, gulp.series(
  `clean`,
  `copy`,
  `image`,
  `styleDev`,
  `customCss`,
  `sprite`,
  `scriptsDev`,
  `scriptsLibs`,
  `pug`,
  (done) => done())
);
