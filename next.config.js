module.exports = {
  transpilePackages: ['react-tweet'],
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
}
