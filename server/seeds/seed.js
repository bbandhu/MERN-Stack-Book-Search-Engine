const db = require('../config/connection');
const { User } = require('../models');

const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    // Here userSeeds should include the savedBooks for each user
    await User.create(userSeeds);
    for (let userSeed of userSeeds) {
      let user = new User(userSeed);
      await user.save();
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});