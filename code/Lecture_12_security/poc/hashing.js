const bcrypt = require('bcrypt');
const password = "1234";



async function hashPassword(password) {
    // you generate a random string
    console.time();
    const randomSalt = await bcrypt.genSalt(12);
    console.log("randomSalt", randomSalt);
    const hashedPassword = await bcrypt.hash(password, randomSalt);
    console.log("hashedPassword", hashedPassword);
    const isTheSameorNot = await bcrypt.compare(password, hashedPassword);
    console.log("result", isTheSameorNot);
    console.timeEnd();
}
hashPassword(password).then(() => {
    console.log("password hash done");

}).catch((err) => {
    console.log("error", err);
});
// salt :  $2b$10$65xLHjJNKYm6JhZZ6ByiU. -> salt is prefix of hash
//  hash : $2b$10$65xLHjJNKYm6JhZZ6ByiU.DYHS2OHKXvd9yDqjrSrtpDD1a6Elhj6
/**
 * to generate -> hash  
 *      -> given salt (djafhvdsjhv)(password) -> hash -> (salt+randomtext)[stored in the DB]
 * 
 * to compare -> (password that user enters)(salt from the the hash stored in the DB)
 *               -> newly created hash== hash stored in the DB-> those two password were same
 * **/
