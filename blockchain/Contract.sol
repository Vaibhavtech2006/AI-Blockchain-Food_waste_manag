// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FoodDonation is Ownable {
    uint256 public donationCount = 0;

    enum Status { Donated, PickedUp, Delivered }

    struct Donation {
        address donor;
        string foodDetails;
        uint quantity;
        Status status;
        uint timestamp;
    }

    mapping(uint256 => Donation) private donations;

    event DonationRegistered(
        uint indexed donationId,
        address indexed donor,
        string foodDetails,
        uint quantity,
        uint timestamp
    );

    event DonationStatusUpdated(uint indexed donationId, Status newStatus);

    // Constructor passes msg.sender as initial owner
    constructor() Ownable(msg.sender) {}

    function donateFood(string memory foodDetails, uint quantity) public {
        require(quantity > 0, "Invalid quantity");
        require(bytes(foodDetails).length > 0 && bytes(foodDetails).length <= 256, "Food details length invalid");

        donations[donationCount] = Donation(
            msg.sender,
            foodDetails,
            quantity,
            Status.Donated,
            block.timestamp
        );

        emit DonationRegistered(donationCount, msg.sender, foodDetails, quantity, block.timestamp);
        donationCount++;
    }

    function updateDonationStatus(uint donationId, Status newStatus) public onlyOwner {
        require(donationId < donationCount, "Invalid Donation ID");
        donations[donationId].status = newStatus;
        emit DonationStatusUpdated(donationId, newStatus);
    }

    function getDonation(uint donationId) public view returns (
        address donor,
        string memory foodDetails,
        uint quantity,
        Status status,
        uint timestamp
    ) {
        require(donationId < donationCount, "Invalid Donation ID");
        Donation memory donation = donations[donationId];
        return (
            donation.donor,
            donation.foodDetails,
            donation.quantity,
            donation.status,
            donation.timestamp
        );
    }
}