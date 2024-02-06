module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/',
            outputPath: 'static/videos/',
            name: '[name].[ext]',
            esModule: true,
          },
        },
      });
  
      return config;
    },
  };
  