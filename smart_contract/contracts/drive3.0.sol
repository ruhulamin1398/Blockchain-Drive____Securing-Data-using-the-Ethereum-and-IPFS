// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {

    struct Access {
        address user;
        bool access; // true or false
    }

    mapping(address => string[]) private data; // Store data associated with each user.
    mapping(address => mapping(address => bool)) private ownership; // Manage ownership of data.
    mapping(address => Access[]) private accessList; // Keep track of shared access.
    mapping(address => mapping(address => bool)) private previousData; // Keep track of previously shared data.

    // Allow a user to add data to their own account.
    function addData(string memory url) external {
        data[msg.sender].push(url);
    }

    // Allow another user to access the data.
    function allowAccess(address user) external {
        ownership[msg.sender][user] = true;

        if (previousData[msg.sender][user]) {
            // Update the access rights if the data was previously shared.
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            // Add a new entry in the access list if it's the first time sharing.
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    // Disallow access for a user.
    function disallowAccess(address user) external {
        ownership[msg.sender][user] = false;

        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // Display data associated with a user, but only if the caller has access.
    function displayData(address _user) external view returns (string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return data[_user];
    }

    // Share access list for the caller's data.
    function shareAccessList() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
