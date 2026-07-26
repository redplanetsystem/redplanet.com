/** @type {import('postcss-load-config').Config} */
const config = {
  // Enterprise-grade styling pipeline configuration for Red Planet ecosystem
  plugins: {
    '@tailwindcss/postcss': {
      // Future-proof optimization parameters can be added here
    },
  },
  // Enable source maps in development for precise CSS debugging, disable in production for minimal footprint
  map: process.env.NODE_ENV !== 'production',
};

export default config;