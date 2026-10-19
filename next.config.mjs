/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages sólo sirve archivos estáticos: `next build` genera `out/`.
  // Export no admite PPR, por eso no se activan cacheComponents ni partialPrefetching.
  output: "export",
  poweredByHeader: false,
};

export default nextConfig;
