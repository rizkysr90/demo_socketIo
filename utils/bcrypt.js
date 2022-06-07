const bcrypt = require('bcrypt');

module.exports = {
    async encryptWithBcrypt(str) {
        return await bcrypt.hash(str, +process.env.SALT_HASH);
    },
    async compareWithBcrypt(str,hashedStr) {
        return bcrypt.compare(str,hashedStr);
    },

}