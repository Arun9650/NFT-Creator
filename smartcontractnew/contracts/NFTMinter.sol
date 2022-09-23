//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTMinter is ERC721Enumerable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) public tokenURIs;
 using Strings for uint256;


    string _baseTokenURI;


    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
      
    }

    // function _setTokenURI(string memory metaData)  internal {
    //     _baseTokenURI = metaData;

    // }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        tokenURIs[tokenId] = _tokenURI;
    }


//  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
//         _requireMinted(tokenId);

//         string memory baseURI = _baseURI();
//         return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
//     }

  function tokenURI(uint256 tokenId) public view virtual  override returns (string memory){
        require(_exists(tokenId));
        string memory _tokenURI = tokenURIs[tokenId];
        return _tokenURI;
    } 

   
function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function mintToken(address owner ,string memory metadataURI)
    public
    returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);
        
       

        return id;
    }
}