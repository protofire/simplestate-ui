// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ProjectsMock {

    struct FinanctialMetadata {
        uint256 foundingAmount;
        uint256 foundingTime; // days
        uint256 sellAmount;
        uint256 sellTime;  // months
        uint256 raised;
    }

    struct Project {
        uint256 id;
        string name;
        address owner;
        address incomeDepositor;
        string metadataURL;
        uint256 maxSupply;
        FinanctialMetadata financtialMetadata;
        bool produceIncome;
        bool allowPartialSell;
        string state;
        string unitOfAccount;
    }

    event SingleProjectInvestment(address user, uint256 projectId, uint256 amount);

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
            id: projects.length,
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

    function invest(uint256 projectId) public payable {
        projects[projectId].financtialMetadata.raised += msg.value;
        emit SingleProjectInvestment(msg.sender, projectId, msg.value);
    }

}