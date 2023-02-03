module.exports = {
  apps : [{
    name   : "TEMPLATE",
    script : "npm run start",
    instances: 1,
    env: {
      PORT: 619
    },
    increment_var : 'PORT',
  }]
}
