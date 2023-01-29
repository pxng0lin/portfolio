// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ToDoList {
    uint256 public taskCount; // state variable
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function getTaskCount() public view returns (uint256) {
        return taskCount;
    }
}
