// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Script.sol";
import {ToDoList} from "src/ToDoList.sol";

contract ToDoListScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        // new contract instance, no args needed for the constructor
        new ToDoList();
        vm.stopBroadcast();
    }
}
