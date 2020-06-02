function fakeInitializeApp(config) {
  console.log('pretending to initialize')
  console.log(`this is the private key: ${config.privateKey || ''}`)
  return config
}
const fakeConfig = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
}

export default fakeInitializeApp(fakeConfig)
