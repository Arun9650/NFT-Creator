
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./NFTMinter.sol";

contract ERC721Factory{

    event created( string collectionName, string collectionSymbol);
   
   function create( string memory collectionName_, string memory collectionSymbol_, string memory metadata) external returns (bool){

    NFTMinter nft721 = new NFTMinter( collectionName_, collectionSymbol_);
                            nft721.mintToken(msg.sender,metadata);
    address _tokenaddress = address(nft721);


    emit created(collectionName_, collectionSymbol_);
    return true;
   }
}


