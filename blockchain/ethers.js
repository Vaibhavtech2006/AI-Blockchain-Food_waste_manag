import { ethers } from "ethers";
import FoodDonationAbi from "./FoodDonation.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contract = new ethers.Contract(contractAddress, FoodDonationAbi, signer);

// Add donation
await contract.addDonation(100, "Meals", "HelpingHands");

// Fetch total donations
const total = await contract.getDonationsCount();
console.log(total.toString());
