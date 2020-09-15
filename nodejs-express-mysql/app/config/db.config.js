const HOSTUSER = process.env.NODE_USER;
const HOSTPASSWORD = process.env.NODE_PASS; 

module.exports = {
    HOST: "localhost",
    USER: HOSTUSER,
    PASSWORD: HOSTPASSWORD,
    DB: "localdb"
};