module.exports = { experimental: { esmExternals: false }, webpack: config => { config.module.rules.push({ test: /node_modules\/thread-stream/, use: 'null-loader' }); return config; } };
