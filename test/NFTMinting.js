// test/NFT.test.js

const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
    let nftInstance;
    const admin = accounts[0];
    const user = accounts[1];

    beforeEach(async () => {
        nftInstance = await NFT.new({ from: admin });
    });

    it("should mint an NFT and assign it to the correct address", async () => {
        await nftInstance.mint(user, { from: admin });
        const owner = await nftInstance.ownerOf(0);
        assert.equal(owner, user, "The owner of the NFT should be the user address");

        const tokenURI = await nftInstance.tokenURI(0);
        assert.equal(
            tokenURI,
            "ipfs://QmPZx3Me8LkyKRFRAd9pbr7SNWKkjQXQ51L7p5eLC8cA1R",
            "The token URI should be set correctly"
        );
    });

    it("should only allow the admin to mint NFTs", async () => {
        try {
            await nftInstance.mint(user, { from: user });
            assert.fail("Non-admin should not be able to mint NFTs");
        } catch (error) {
            assert(
                error.message.includes("only admin has can mint"),
                "Expected 'only admin has can mint' error but did not get it"
            );
        }
    });

    it("should increment the token ID for each new NFT", async () => {
        await nftInstance.mint(user, { from: admin });
        await nftInstance.mint(user, { from: admin });

        const ownerOfFirstNFT = await nftInstance.ownerOf(0);
        const ownerOfSecondNFT = await nftInstance.ownerOf(1);

        assert.equal(ownerOfFirstNFT, user, "The owner of the first NFT should be the user address");
        assert.equal(ownerOfSecondNFT, user, "The owner of the second NFT should be the user address");
    });
});
