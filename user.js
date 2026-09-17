import ut from "./utils.js"
import ui from "./ui.js"

class User
{
    constructor(info)
    {
        this.username = info.username;
        this.password = info.password;
        this.name = info.name;
        this.email = info.email;
        this.balance = info.balance;
        this.creditScore = info.creditScore;
        this.creditCard = info.creditCard;
    }

    _show_info()
    {
        console.log(`Username: ${this.username}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
    }

    _show_balance()
    {
        console.log(`Balance: ` , ut._add_dot(this.balance));
    }

    async _deposit_money()
    {
        const deposit_money = Number(await ui._ask("Money deposit: "));

        if (deposit_money <= 0 || Number.isNaN(deposit_money))
        {
            console.log("Error deposit");
        }
        else
        {
            this.balance += deposit_money;
            this._show_balance();
        }
    }

    async _handle_choice(choice)
    {
        if (choice == 1)
        {
            this._show_info();
        }
        if (choice == 2)
        {
            this._show_balance();
        }
        if (choice == 3)
        {
            await this._deposit_money();
        }
    }
};

export default
{
    User
};