import fs from "node:fs";
import ui from "./ui.js"

class Bank
{
    constructor(name)
    {
        this.name = "Ngan hang kinh te va cong nghe " + name;
        this.data = this._take_data();
        this.users = this._take_users();
    }

    _take_data()
    {
        const json = fs.readFileSync("./data.json" , "utf-8");

        return JSON.parse(json);
    }

    _take_users()
    {
        return this.data.users;
    }

    _save_data()
    {
        const json = JSON.stringify(this.data, null, 4);

        fs.writeFileSync("./data.json", json, "utf-8");
    }

    _save_user(user)
    {
        const data = this.users.find(
            (item) => item.username === user.username
        )

        if (data === undefined)
        {
            console.log("Error save user");
            return false;
        }

        data.balance = user.balance;
        data.creditScore = user.creditScore;
        data.creditCard = user.creditCard;
        data.transactionHistory = user.transactionHistory;

        this._save_data();
    }

    _find_user(account)
    {
        return this.users.find(
            (item) => item.username == account
        );
    }

    _transfer_money(from_account , to_account , money)
    {
        const sender = this.users.find(
            (user) => user.username == from_account.username
        );

        const receiver = this.users.find(
            (user) => user.username == to_account
        );

        if (!receiver)
        {
            return "Cant find receiver";
        }

        if (money > sender.balance)
        {
            return "You cheap fuck";
        }

        sender.balance -= money;
        receiver.balance += money;

        this._save_data();

        return "Transfer successfully";
    }

    async _login()
    {
        const account = await ui._ask("Enter account: ");
        const password = await ui._ask("Enter password: ");

        return this.users.find(
            (user) => user.username === account && user.password === password
        );
    }
};

export default
{
    Bank
};