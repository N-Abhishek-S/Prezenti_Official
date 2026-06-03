// vite.config.ts
import { defineConfig } from "file:///C:/Users/nagar/OneDrive/Desktop/Presenti%20Web/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///C:/Users/nagar/OneDrive/Desktop/Presenti%20Web/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///C:/Users/nagar/OneDrive/Desktop/Presenti%20Web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Sitemap from "file:///C:/Users/nagar/OneDrive/Desktop/Presenti%20Web/node_modules/vite-plugin-sitemap/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\nagar\\OneDrive\\Desktop\\Presenti Web";
var vite_config_default = defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Sitemap({
      hostname: "https://prezenti.com",
      dynamicRoutes: [
        "/",
        "/platform",
        "/services",
        "/industries",
        "/about",
        "/pricing",
        "/talk-to-us",
        "/compliance",
        "/case-studies",
        "/faq",
        "/contact",
        "/security",
        "/privacy-policy",
        "/terms-and-conditions",
        "/housekeeping-services",
        "/security-services",
        "/receptionist-staffing-services",
        "/office-boy-services",
        "/pantry-staff-services",
        "/facility-management-services",
        "/property-management-services"
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "framer-motion": ["framer-motion"],
          "lucide": ["lucide-react"]
        }
      }
    }
  },
  css: {
    postcss: {}
    // Explicitly empty to prevent resolving global postcss.config.js
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuYWdhclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFByZXNlbnRpIFdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbmFnYXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxQcmVzZW50aSBXZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL25hZ2FyL09uZURyaXZlL0Rlc2t0b3AvUHJlc2VudGklMjBXZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IFNpdGVtYXAgZnJvbSAndml0ZS1wbHVnaW4tc2l0ZW1hcCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB0YWlsd2luZGNzcygpLFxuICAgIHJlYWN0KCksXG4gICAgU2l0ZW1hcCh7XG4gICAgICBob3N0bmFtZTogJ2h0dHBzOi8vcHJlemVudGkuY29tJyxcbiAgICAgIGR5bmFtaWNSb3V0ZXM6IFtcbiAgICAgICAgJy8nLFxuICAgICAgICAnL3BsYXRmb3JtJyxcbiAgICAgICAgJy9zZXJ2aWNlcycsXG4gICAgICAgICcvaW5kdXN0cmllcycsXG4gICAgICAgICcvYWJvdXQnLFxuICAgICAgICAnL3ByaWNpbmcnLFxuICAgICAgICAnL3RhbGstdG8tdXMnLFxuICAgICAgICAnL2NvbXBsaWFuY2UnLFxuICAgICAgICAnL2Nhc2Utc3R1ZGllcycsXG4gICAgICAgICcvZmFxJyxcbiAgICAgICAgJy9jb250YWN0JyxcbiAgICAgICAgJy9zZWN1cml0eScsXG4gICAgICAgICcvcHJpdmFjeS1wb2xpY3knLFxuICAgICAgICAnL3Rlcm1zLWFuZC1jb25kaXRpb25zJyxcbiAgICAgICAgJy9ob3VzZWtlZXBpbmctc2VydmljZXMnLFxuICAgICAgICAnL3NlY3VyaXR5LXNlcnZpY2VzJyxcbiAgICAgICAgJy9yZWNlcHRpb25pc3Qtc3RhZmZpbmctc2VydmljZXMnLFxuICAgICAgICAnL29mZmljZS1ib3ktc2VydmljZXMnLFxuICAgICAgICAnL3BhbnRyeS1zdGFmZi1zZXJ2aWNlcycsXG4gICAgICAgICcvZmFjaWxpdHktbWFuYWdlbWVudC1zZXJ2aWNlcycsXG4gICAgICAgICcvcHJvcGVydHktbWFuYWdlbWVudC1zZXJ2aWNlcydcbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBob3N0OiB0cnVlLFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgICdmcmFtZXItbW90aW9uJzogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgJ2x1Y2lkZSc6IFsnbHVjaWRlLXJlYWN0J11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge30gLy8gRXhwbGljaXRseSBlbXB0eSB0byBwcmV2ZW50IHJlc29sdmluZyBnbG9iYWwgcG9zdGNzcy5jb25maWcuanNcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1UsU0FBUyxvQkFBb0I7QUFDalcsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsZUFBZTtBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osZ0JBQWdCLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ3pELGlCQUFpQixDQUFDLGVBQWU7QUFBQSxVQUNqQyxVQUFVLENBQUMsY0FBYztBQUFBLFFBQzNCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTLENBQUM7QUFBQTtBQUFBLEVBQ1o7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
