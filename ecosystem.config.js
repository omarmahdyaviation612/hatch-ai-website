// PM2 Ecosystem — manages both servers
// Usage:
//   npm install -g pm2
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 startup

module.exports = {
  apps: [
    {
      name: 'hatch-website',
      cwd: './',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'hatch-dashboard',
      cwd: './dashboard-server',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        DASHBOARD_PORT: 3001,
      },
    },
  ],
};
