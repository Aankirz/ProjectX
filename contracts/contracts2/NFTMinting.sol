// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// openzeppelin imports
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTMarket is ERC721URIStorage{
    uint256 private _tokenIds;
    uint256 private _tokenSold;


    string private baseTokenURI;
    address payable owner;
    mapping(uint256 => uint256) private _tokenPrices;
    mapping(uint256 => string) private _tokenURIs;
    mapping(IERC721=>uint256) public tokenIds;

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
        uint256 newItemId = _tokenIds;
        _mint(msg.sender,newItemId);
        _setTokenURI(newItemId,_tokenURI);
        _setTokenPrice(newItemId,_price);
        
        return newItemId;
    }

    function _setTokenPrice(uint256 tokenId, uint256 price) internal {
        _tokenPrices[tokenId] = price;
    }
    function _getTokenIds(IERC721 token) public view returns(uint256){
        return tokenIds[token];
    }
} 