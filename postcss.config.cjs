// This file was postcss.config.js, now postcss.config.cjs for CommonJS compatibility
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
} 