// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ProjectsMock {

    struct FinanctialMetadata {
        uint64 foundingAmount;
        uint64 foundingTime; // days
        uint64 sellAmount;
        uint64 sellTime;  // months
        uint64 raised;
    }

    struct Project {
        string name;
        address owner;
        address incomeDepositor;
        string metadataURL;
        uint64 maxSupply;
        FinanctialMetadata financtialMetadata;
        bool produceIncome;
        bool allowPartialSell;
        string state;
        string unitOfAccount;
        //   feeModel: 'listing',
        //   permissioningModel: 'blacklist',
        //   valuationModel: 'rate'
    }

    Project[] public projects;

    function create( 
        string memory name,
        address owner,
        address incomeDepositor,
        string memory metadataURL,
        uint64 maxSupply,
        uint64 foundingAmount,
        uint64 foundingTime,
        uint64 sellAmount,
        uint64 sellTime,
        bool produceIncome,
        bool allowPartialSell
    ) public {

        Project memory current = Project({
            name: name,
            owner: owner,
            incomeDepositor: incomeDepositor,
            metadataURL: metadataURL,
            maxSupply: maxSupply,
            financtialMetadata: FinanctialMetadata({
                foundingAmount: foundingAmount,
                foundingTime: foundingTime,
                sellAmount: sellAmount,
                sellTime: sellTime,
                raised: 0
            }),
            produceIncome: produceIncome,
            allowPartialSell: allowPartialSell,
            state: "created",
            unitOfAccount: "USDC"
        });

        projects.push(current);
    }

    function size() public view returns(uint256) {
        return projects.length;
    }
}