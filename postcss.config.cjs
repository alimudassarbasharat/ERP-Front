// This file was postcss.config.js, now postcss.config.cjs for CommonJS compatibility
module.exports = {
  plugins: {
    // Temporarily disabled postcss-import due to resolve package issue
    // 'postcss-import': {},
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
} 