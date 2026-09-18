import fs from "node:fs";
import ui from "./ui.js"
import ut from "./utils.js"

class Bank
{
    #data;
    #users;

    constructor(name)
    {
        this.name = "Ngan hang kinh te va cong nghe " + name;
        this.#data = this._take_data();
        this.#users = this._take_users();
    }

    _take_data()
    {
        const json = fs.readFileSync("./data.json" , "utf-8");

        return JSON.parse(json);
    }

    _take_users()
    {
        return this.#data.users;
    }

    _save_data()
    {
        const json = JSON.stringify(this.#data, null, 4);

        fs.writeFileSync("./data.json", json, "utf-8");
    }

    _save_user(user)
    {
        const data = this.#users.find(
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

    _give_history_sample()
    {
        return {
            "type" : null ,
            "amount" : null ,
            "date" : null ,
            "description" : null ,
            "balanceAfter" : null
        }
    }

    _save_history(account , type , amount , description)
    {
        const user = this._find_user(account)

        const transaction_history = this._give_history_sample();

        transaction_history.type = type;
        transaction_history.amount = amount;
        transaction_history.date = ut._take_date();
        transaction_history.description = description;
        transaction_history.balanceAfter = user.balance;

        user.transactionHistory.unshift(transaction_history);

        this._save_data();
    }

    _find_user(account)
    {
        return this.#users.find(
            (item) => item.username == account.username
        );
    }

    _deposit_money(account , money)
    {
        const user = this._find_user(account);

        user.balance += money;

        this._save_history(user , "deposit" , money , "Nap tien");

        this._save_data();

        return user.balance;
    }

    _withdraw_money(account , money)
    {
        const user = this._find_user(account);

        user.balance -= money;

        this._save_history(user , "withdraw" , money , "Rut tien");

        this._save_data();

        return user.balance;
    }

    _transfer_money(from_account , to_account , money , description)
    {
        const sender = this.#users.find(
            (user) => user.username == from_account.username
        );

        const receiver = this.#users.find(
            (user) => user.username == to_account
        );

        if (!receiver)
        {
            return "Cant find receiver";
        }

        sender.balance -= money;
        receiver.balance += money;

        this._save_history(sender , "transfer" , money , description);

        this._save_data();

        return "Transfer successfully";
    }

    _create_cardnumber()
    {
        while (true)
        {
            const number = ut._create_cardnumber();

            if (!this.#users.find(
                (user) => user.creditCard?.number == number
            ))
            {
                return number;   
            }
        }
    }

    _create_creditcard(account)
    {
        const creditCard = 
        {
            "number" : this._create_cardnumber() ,
            "limit" : 10000000 ,
            "used" : 0 ,
            "available" : 10000000 ,
            "expiryDate" : ut._take_expiry_date() ,
            "paymentDueDate" : ut._take_paymentDue_date() ,
            "status" : "active"
        }

        const user = this._find_user(account)

        user.creditCard = creditCard;

        this._save_data();
    }

    async _login()
    {
        const account = await ui._ask("Enter account: ");
        const password = await ui._ask("Enter password: ");

        return this.#users.find(
            (user) => user.username === account && user.password === password
        );
    }
};

export default
{
    Bank
};