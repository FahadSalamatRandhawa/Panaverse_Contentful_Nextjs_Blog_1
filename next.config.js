/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    CONTENTFUL_SPACE_ID:'ij92yfbun5y2',
    CONTENTFUL_ACCESS_KEY:'OG_tB8bc4dOuIFEGUDaEtYzgy3N51clcolwTWIJXsmk'
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'images.ctfassets.net',
        port:''
      }
    ]
  }
}

module.exports = nextConfig
