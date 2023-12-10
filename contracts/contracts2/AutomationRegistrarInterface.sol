// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

struct RegistrationParams {
    string name;
    bytes encryptedEmail;
    address upkeepContract;
    uint32 gasLimit;
    address adminAddress;
    uint8 triggerType;
    bytes checkData;
    bytes triggerConfig;
    bytes offchainConfig;
    uint96 amount;
}

/**
 * string name = "test upkeep";
 * bytes encryptedEmail = 0x;
 * address upkeepContract = 0x...;
 * uint32 gasLimit = 500000;
 * address adminAddress = 0x....;
 * uint8 triggerType = 0;
 * bytes checkData = 0x;
 * bytes triggerConfig = 0x;
 * bytes offchainConfig = 0x;
 * uint96 amount = 1000000000000000000;
 */

interface AutomationRegistrarInterface {
    function registerUpkeep(
        RegistrationParams calldata requestParams
    ) external returns (uint256);
}

contract Loan is AutomationCompatibleInterface{
    LinkTokenInterface public immutable i_link;
    AutomationRegistrarInterface public immutable i_registrar;


    uint256 public LoanPrice;
    address public LPProvider;
    IERC721 public collateralToken;
    uint256 public collateralTokenId;

    constructor(
        LinkTokenInterface link,
        AutomationRegistrarInterface registrar
    ) {
        i_link = link;
        i_registrar = registrar;
    }

    function registerAndPredictID(RegistrationParams memory params) public {
        // LINK must be approved for transfer - this can be done every time or once
        // with an infinite approval
        i_link.approve(address(i_registrar), params.amount);
        uint256 upkeepID = i_registrar.registerUpkeep(params);
        if (upkeepID != 0) {
            // DEV - Use the upkeepID however you see fit
        } else {
            revert("auto-approve disabled");
        }
    }


    bool public active;
    bool public isCancel;
    uint256 public lastTimeStamp;
    uint256 public interval;

    event LoanProvided(uint LPId, address LPProvider, uint LoanAmount, address LoanTaker);
    event LoanRepaid(address LoanTaker, uint TotalRepayment);

      // transfer Token
    function transferToken(address _from, address _to, IERC721 _token,uint256 _tokenId) public payable {
        _token.transferFrom(_from, _to,_tokenId);
    }
    
    
    // Transfer Amount
    function transferAmount(address _from, address  _to, uint256 _amount,IERC721 _token,uint256 _tokenId)public payable returns(bool) {
        bool success2=msg.value>=_amount;
        if(!success2){
            isCancel=true;
            active=false;
            transferToken(_from, _to, _token,_tokenId);
        }
        bool success=payable(_to).send(_amount);
        return success;
    }

    function provideLoan(uint _LPId,address _LPProvider,uint256 _LoanPrice,address _LoanTaker,uint _collateralTokenID,IERC721 _collateralToken) external payable { // id of loan Provider,id of Borrower,collateral token of borrower
        require(active, "Loan Provider is not active");
        require(msg.value >= LoanPrice, "Incorrect loan amount sent");
        active = true;

        LoanPrice=_LoanPrice;
        LPProvider=_LPProvider;
        collateralToken=_collateralToken;
        collateralTokenId=_collateralTokenID;
    
        // Loack the ERC20 collateral to the contract
        transferToken(msg.sender,address(this),_collateralToken,_collateralTokenID);
        // Transfer loan amount to the Borrower // error
        transferAmount(LPProvider,_LoanTaker,LoanPrice,_collateralToken,_collateralTokenID);

        lastTimeStamp=block.timestamp;

        emit LoanProvided(_LPId,LPProvider, LoanPrice,_LoanTaker);
    }
    unction repayLoan(uint256 rate,uint256 LoanPrice,address LPProvider,IERC721 _collateralToken,uint256 _collateralTokenId) public {
        // Calculate interest based on the rate and time elapsed
        uint interest = calculateInterest(rate,LoanPrice);
        // Total amount to be repaid
        uint totalRepayment = interest;
        transferAmount(payable(address(this)), payable(LPProvider), LoanPrice,_collateralToken,_collateralTokenId);/// transfer function



        // // Transfer back the locked collateral  after 3 rounds ........
        // IERC20 collateralToken = loanProviders[_LPId].collateral;
        // require(collateralToken.transfer(loanProviders[_LPId].LoanTaker, totalRepayment), "Collateral and repayment transfer back failed");

        emit LoanRepaid(msg.sender, totalRepayment);
    }

// function endLoan()
    function calculateInterest(uint256 rate,uint256 LoanPrice) internal view returns (uint) {
        uint elapsedTime = block.timestamp - lastTimeStamp;
        return (LoanPrice * rate * elapsedTime) / (365 days * 100);
    }




/*******************************************************************/
     // UPKEEP
    function checkUpkeep(bytes calldata) external view override returns(bool upkeepNeeded,bytes memory) {
      // Check true or not
      upkeepNeeded=(block.timestamp-lastTimeStamp)>interval;
    }

    function performUpkeep(bytes calldata) external override{
        
        //revalidate
        if((block.timestamp-lastTimeStamp)>interval){
        // DO THE NECESSITY
        lastTimeStamp=block.timestamp;
        //STEP 1
        repayLoan(13,LoanPrice,LPProvider,collateralToken,collateralTokenId);
        }
    }


}