// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ProjectsMock {

    struct Project {
        string  name; 
        string  state;
        uint256 maxSupply;
        uint256 foundingAmountTarget;
        uint256 foundingTimeTarget; // Unix timestamp
        uint256 sellAmountTarget;
        uint256 sellTimeTarget;  // Unix timestamp
        address incomeDepositor;
    }

    Project[] public projects;

    function create( 
        string memory name, 
        string memory state,
        uint256 maxSupply,
        uint256 foundingAmountTarget,
        uint256 foundingTimeTarget,
        uint256 sellAmountTarget,
        uint256 sellTimeTarget,
        address incomeDepositor
    ) public {

        Project memory current = Project({
            name: name, 
            state: state,
            maxSupply: maxSupply,
            foundingAmountTarget: foundingAmountTarget,
            foundingTimeTarget: foundingTimeTarget,
            sellAmountTarget: sellAmountTarget,
            sellTimeTarget: sellTimeTarget,
            incomeDepositor: incomeDepositor
        });

        projects.push(current);

    }

    function size() public view returns(uint256) {
        return projects.length;
    }
}