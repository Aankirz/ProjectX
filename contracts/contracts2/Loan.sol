// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";


contract Loan {
    uint public amount;
    constructor(uint256 _amount) public{
       amount=_amount;
    }

    bool public active;
    bool public isCancel;

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

    function provideLoan(uint _LPId,address LPProvider,uint256 LoanPrice,address LoanTaker,uint _collateralTokenID,IERC721 _collateralToken ) external payable { // id of loan Provider,id of Borrower,collateral token of borrower
        require(active, "Loan Provider is not active");
        require(msg.value >= LoanPrice, "Incorrect loan amount sent");

        active = true;
        // Loack the ERC20 collateral to the contract
        transferToken(msg.sender,address(this),_collateralToken,_collateralTokenID);
        // Transfer loan amount to the Borrower // error
        transferAmount(LPProvider,LoanTaker,LoanPrice,_collateralToken,_collateralTokenID);

        emit LoanProvided(_LPId,LPProvider, LoanPrice,LoanTaker);
    }

    function repayLoan(uint256 startTime,uint256 rate,uint256 LoanPrice,address LPProvider,IERC721 _collateralToken,uint256 _collateralTokenId) external {
        // Calculate interest based on the rate and time elapsed
        uint interest = calculateInterest(startTime,rate,LoanPrice);
        // Total amount to be repaid
        uint totalRepayment = interest;
        transferAmount(payable(address(this)), payable(LPProvider), LoanPrice,_collateralToken,_collateralTokenId);/// transfer function



        // // Transfer back the locked collateral  after 3 rounds ........
        // IERC20 collateralToken = loanProviders[_LPId].collateral;
        // require(collateralToken.transfer(loanProviders[_LPId].LoanTaker, totalRepayment), "Collateral and repayment transfer back failed");

        emit LoanRepaid(msg.sender, totalRepayment);
    }

// function endLoan()
    function calculateInterest(uint256 startTime,uint256 rate,uint256 LoanPrice) internal view returns (uint) {
        uint elapsedTime = block.timestamp - startTime;
        return (LoanPrice * rate * elapsedTime) / (365 days * 100);
    }
}