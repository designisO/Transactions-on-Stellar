const Stellar = require("stellar-sdk"); 
const accounts = require("../accounts");

const server = new Stellar.Server("horizon-testnet.stellar.org");

const checkAccounts = async accounts => {
    const sAccounts = await Promise.all(
        accounts.map(async account => await server.loadAccount(account.publicKey))
        );

     return sAccounts.map(({id, balances}) => ({
            id,
            balances
        }));
};

checkAccounts(accounts)
    .then(accounts => console.log(accounts))
    .catch(e => {
        console.log(e); 
        throw e;
    });
