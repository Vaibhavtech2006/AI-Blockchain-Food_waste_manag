// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FoodDonation {
    struct Donation {
        uint256 amount;
        string foodType;
        string ngo;
        uint256 timestamp;
        bool claimed;
    }

    Donation[] public donations;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event DonationAdded(uint256 id, uint256 amount, string foodType, string ngo);

    function addDonation(uint256 _amount, string memory _foodType, string memory _ngo) public {
        donations.push(Donation(_amount, _foodType, _ngo, block.timestamp, false));
        emit DonationAdded(donations.length - 1, _amount, _foodType, _ngo);
    }

    function markClaimed(uint256 _id) public {
        require(_id < donations.length, "Invalid donation ID");
        donations[_id].claimed = true;
    }

    function getDonationsCount() public view returns (uint256) {
        return donations.length;
    }
}
