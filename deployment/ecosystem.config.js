module.exports = {
  apps : [{
    name   : "genre-api",
    script : "npm run start",
    instances: 1,
    env: {
      PORT: 8888
    },
    increment_var : 'PORT',
  }]
}
