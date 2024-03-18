// version of solidity compiler
pragma solidity ^0.8.4;

// contract inheritance
contract owned {
    bool public paused;
    address owner;
    constructor() {
        owner = msg.sender;
    }

    // function modifiers
    modifier onlyOwner {
    require(msg.sender == owner, "Only contract owner can call this function");
    _;
    }
}

contract pausable is owned {
    function setPaused(bool _paused) public onlyOwner {
        paused = _paused;
    }
}

// contract object
contract Faucet is pausable {
    // event Withdrawal(address indexed to, uint amount);
    // event Deposit(address indexed from, uint amount);

    function withdraw(uint withdraw_amount) public {
        // error handling
        require(paused == false, "Function paused");
        require(withdraw_amount <= 0.1 ether, "Withdrawals are limited to 0.1 ether");
        require(address(this).balance >= withdraw_amount, "Insufficient balance in faucet");

        // send amount to the address that requested it
        payable(msg.sender).transfer(withdraw_amount);
        // event data -> transaction logs
        // emit Withdrawal(msg.sender, withdraw_amount);
    }

    // accept incoming payments
    function deposit() public payable {
        // emit Deposit(msg.sender,msg.value);
    }
}