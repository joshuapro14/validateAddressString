var chai = require('chai');
var validateAddressString = require('../validateAddressString').validateAddressString;
let {validAddress} = require('./testConfig');
let {inValidAddress} = require('./testConfig');
let {USPSid} = require('./testConfig');

/**
 * Executes the test: whether function 'validateAddressString' validates correctly
 * @param {string} addressString A string that conforms to the address format: "street1,city,zip,state"
 * @param {string} USPSid ID Code given by USPS after signing up for a developer account
 * @param {boolean} isValid expected output (true/false)
 *
 * @requires validateAddressString
 */
let executeTest = (addressString, USPSid, isValid) => {
  let testString = "validating given address "+ addressString+" & expecting "+isValid;
  it(testString,(done) => {
    validateAddressString(addressString, USPSid)
      .then(match =>  {
        console.log(testString+"\n"+"Received match (valid) & was expecting "+isValid);
        console.log("Match : "+match);
        chai.expect(isValid).to.be.true;
        done();
      }, e => {
        console.log(testString+"\n"+"Didn't received match (valid) & was expecting "+isValid);
        console.log("Match : "+e);
        chai.expect(isValid).to.be.false;
        done();
      }).catch(done);
  });
}

describe("Testing function 'validateAddressString'",()=> {
  validAddress.map(address => executeTest(address,USPSid,true));
  inValidAddress.map(address => executeTest(address,USPSid,false));
})
