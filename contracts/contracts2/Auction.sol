// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract LoanContract {
    
    struct LoanProvider {
        uint LPId;
        address LPProvider;
        uint rate;
        uint LoanPrice;
        uint startTime;
        bool LoanActive;
        address LoanTaker;
        IERC20 collateral;
    }
    
    mapping(uint => LoanProvider) public loanProviders;
    mapping(address=>uint) public SPtoLP;
    uint public providerCount;

    event LoanProvided(uint LPId, address LPProvider, uint LoanAmount, address LoanTaker);
    event LoanRepaid(uint LPId, address LoanTaker, uint TotalRepayment);
    event LoanProviderAdded(address LPProvider,uint rate, uint LoanPrice,IERC20 token);
    function addLoanProvider(address _LPProvider, uint _rate, uint _LoanPrice,IERC20 token) external {
        providerCount++;
        loanProviders[providerCount] = LoanProvider(
            providerCount,
            _LPProvider,
            _rate,
            _LoanPrice,
            block.timestamp,
            false,
            address(0),
            token
        );
        emit LoanProviderAdded(_LPProvider,_rate, _LoanPrice,token);
    }

    function provideLoan(uint _LPId,IERC20 _collateralToken ) external payable {
        require(_LPId <= providerCount && _LPId > 0, "Invalid Loan Provider ID");
        require(loanProviders[_LPId].LoanActive, "Loan Provider is not active");
        require(msg.value == loanProviders[_LPId].LoanPrice, "Incorrect loan amount sent");

        loanProviders[_LPId].LoanActive = true;
        loanProviders[_LPId].LoanTaker = msg.sender;
        loanProviders[_LPId].collateral=_collateralToken;

        // Transfer ERC20 collateral to the Lender
        require(_collateralToken.transferFrom(msg.sender, loanProviders[_LPId].LPProvider, msg.value), "Collateral transfer failed");
        
        SPtoLP[msg.sender]=_LPId;
        // Transfer loan amount to the Loan Taker
        payable(loanProviders[_LPId].LPProvider).transfer(msg.value);

        emit LoanProvided(_LPId, loanProviders[_LPId].LPProvider, msg.value, msg.sender);
    }


    function repayLoan() external {
        uint _LPId=SPtoLP[msg.sender];
        require(_LPId <= providerCount && _LPId > 0, "Invalid Loan Provider ID");
        require(msg.sender == loanProviders[_LPId].LoanTaker, "Only the Loan Taker can repay the loan");

        // Calculate interest based on the rate and time elapsed
        uint interest = calculateInterest(_LPId);
        // Total amount to be repaid
        uint totalRepayment = loanProviders[_LPId].LoanPrice + interest;
        payable(loanProviders[_LPId].LPProvider).transfer(totalRepayment);


        // Transfer back the collateral and repayment to the Loan Provider
        IERC20 collateralToken = loanProviders[_LPId].collateral;
        require(collateralToken.transfer(loanProviders[_LPId].LoanTaker, totalRepayment), "Collateral and repayment transfer back failed");

        // Mark the Loan Provider as active again
        loanProviders[_LPId].LoanActive = false;
        loanProviders[_LPId].LoanTaker = address(0);

        emit LoanRepaid(_LPId, msg.sender, totalRepayment);
    }

    // Function to calculate interest based on rate and time elapsed
    function calculateInterest(uint _LPId) internal view returns (uint) {
        uint elapsedTime = block.timestamp - loanProviders[_LPId].startTime;
        uint rate = loanProviders[_LPId].rate;

        // Calculate simple interest: interest = principal * rate * time / (365 days * 100)
        return (loanProviders[_LPId].LoanPrice * rate * elapsedTime) / (365 days * 100);
    }

}
