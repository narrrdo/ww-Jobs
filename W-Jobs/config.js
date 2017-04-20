module.exports = {
    
    issuer: "accounts.examplesoft.com",
    audience: "yoursite.net",
    jwtSecret: "MyS3cr3tK3Y111111",
    jwtSession: {
        session: false
    },
    expirationTokenMinute : '30m',
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/w-jobs',
    'facebook': {
        clientID: '264967197274426',
        clientSecret: '18f2cb5720880088dbd73ea22df27f0a',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
    
}