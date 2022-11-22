// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ProjectsMock {

    struct Project {
        string  name;
        address owner;
        address incomeDepositor;
        string metadataURL;
        uint256 maxSupply;
        uint256 foundingAmountTarget;
        uint256 foundingTimeTarget; // days
        uint256 sellAmountTarget;
        uint256 sellTimeTarget;  // months
        bool produceIncome;
        bool allowPartialSell;
        string  state;
        //   feeModel: 'listing',
        //   unitOfAccount: 'USDC',
        //   permissioningModel: 'blacklist',
        //   valuationModel: 'rate'
    }

    Project[] public projects;

    function create( 
        string memory name,
        address owner,
        address incomeDepositor,
        string memory metadataURL,
        uint256 maxSupply,
        uint256 foundingAmountTarget,
        uint256 foundingTimeTarget,
        uint256 sellAmountTarget,
        uint256 sellTimeTarget,
        bool produceIncome,
        bool allowPartialSell
    ) public {

        Project memory current = Project({
            name: name,
            owner: owner,
            incomeDepositor: incomeDepositor,
            metadataURL: metadataURL,
            maxSupply: maxSupply,
            foundingAmountTarget: foundingAmountTarget,
            foundingTimeTarget: foundingTimeTarget,
            sellAmountTarget: sellAmountTarget,
            sellTimeTarget: sellTimeTarget,
            produceIncome: produceIncome,
            allowPartialSell: allowPartialSell,
            state: "created"
        });

        projects.push(current);

    }

    function size() public view returns(uint256) {
        return projects.length;
    }
}