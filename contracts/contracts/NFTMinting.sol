// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// openzeppelin imports
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMarket is ERC721URIStorage{
    // using Counters for Counters.Counter;
    using SafeMath for uint256;
    uint256 _tokenIds;
    uint256 _tokenSold;


    string private baseTokenURI;
    address payable owner;
    mapping(uint256 => uint256) private _tokenPrices;
    mapping(uint256 => string) private _tokenURIs;

    modifier onlyOwner(){
        require(msg.sender == owner,"ERC721: You are not the owner of this MarketPlace");
        _;
    }

    constructor(string memory _baseTokenURI) ERC721("NFT Market","Anurag Market"){
        owner = payable(msg.sender);
        baseTokenURI=_baseTokenURI;
    }

    // Create NFT 
    function createToken(string memory _tokenURI,uint256 _price) public returns(uint256){
        _tokenIds++;
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender,newItemId);
        _setTokenURI(newItemId,_tokenURI);
        _setTokenPrice(newItemId,_price);
        return newItemId;
    }

    function _setTokenPrice(uint256 tokenId, uint256 price) internal {
        _tokenPrices[tokenId] = price;
    }
} 