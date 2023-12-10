// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./Loan.sol";

contract LoanContract is ReentrancyGuard {
    function deployLoan(uint256 _amount)external{
        Loan newLoan=new Loan(_amount);
    }

    struct LoanProvider {
        uint LPId;
        address LPProvider;
        uint rate;
        uint LoanPrice;
        uint startTime;
        bool LoanActive;
        address LoanTaker;
        IERC721 collateral;
        uint256 collateralId;
    }
    struct Borrower{
        uint SPId;
        address SPProvider;
        uint rate;
        uint LoanPrice;
        uint startTime;
        bool LoanActive;
        address LPPrivider;
        IERC721[] collaterals;
        uint256[] collateralIds;
    }
    
    mapping(uint => LoanProvider) public loanProviders;
    mapping(address=>uint) public SPtoLP;


    mapping(uint => Borrower) public borrowProviders;
    mapping(address=>uint) public LPtoSP;
    
    uint public providerCount;
    uint public borrowerCount;
    event LoanProviderAdded(address LPProvider,uint rate, uint LoanPrice,IERC721 token,uint256 tokenId);

    event BorrowProvider(address SPProvider,uint rate,uint LoanAmount,IERC721[] token,uint256[] tokenIds);

    // Fora adding Borrow Providers
    function addBorrowProvider(address _SPProvider, uint _rate, uint _LoanPrice,IERC721[] memory token,uint256[] memory tokenIds) external {
        borrowerCount++;
        borrowProviders[borrowerCount] = Borrower(
            borrowerCount,
            _SPProvider,
            _rate,
            _LoanPrice,
            block.timestamp,
            false,
            address(0),
            token,
            tokenIds
        );
        emit BorrowProvider(_SPProvider,_rate, _LoanPrice,token,tokenIds);
    }



    // for adding Loan Providers
    function addLoanProvider(address _LPProvider, uint _rate, uint _LoanPrice,IERC721 token,uint256 tokenId) external {
        providerCount++;
        loanProviders[providerCount] = LoanProvider(
            providerCount,
            _LPProvider,
            _rate,
            _LoanPrice,
            block.timestamp,
            false,
            address(0),
            token,
            tokenId
        );
        emit LoanProviderAdded(_LPProvider,_rate, _LoanPrice,token,tokenId);
    }
    function getLoanProviders() external view returns (LoanProvider[] memory) {
        LoanProvider[] memory _loanProviders = new LoanProvider[](providerCount);
        for (uint i = 1; i <= providerCount; i++) {
            _loanProviders[i - 1] = loanProviders[i];
        }
        return _loanProviders;
    }
    function getBorrowProviders() external view returns (Borrower[] memory) {
        Borrower[] memory _borrowProviders = new Borrower[](borrowerCount);
        for (uint i = 1; i <= borrowerCount; i++) {
            _borrowProviders[i - 1] = borrowProviders[i];
        }
        return _borrowProviders;
    }   
    function getaBorrowProvider(uint _SPId) external view returns (Borrower memory) {
        return borrowProviders[_SPId];
    }
    function getaLoanProvider(uint _LPId) external view returns (LoanProvider memory) {
        return loanProviders[_LPId];
    }
}

