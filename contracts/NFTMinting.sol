// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";



    contract NFT is ERC721URIStorage {
        uint256 public nextTokenId;
        address public admin;
    


    constructor() ERC721("MY NFT", "NFT") {
        admin = msg.sender;
    }


 



    function mint(address to) external {
        require(msg.sender == admin , "only admin has can mint");
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, "ipfs://QmPZx3Me8LkyKRFRAd9pbr7SNWKkjQXQ51L7p5eLC8cA1R");
        nextTokenId++;
    }
    
}
