import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  server: {
    proxy: {
      '/api/smoove': {
        target: 'https://rest.smoove.io/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/smoove/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
