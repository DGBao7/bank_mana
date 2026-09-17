import ut from "./utils.js"
import ui from "./ui.js"

class User
{
    constructor(info , bank)
    {
        this.username = info.username;
        this.password = info.password;
        this.name = info.name;
        this.email = info.email;
        this.balance = info.balance;
        this.creditScore = info.creditScore;
        this.creditCard = info.creditCard;

        this.bank = bank;
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

    async _withdraw_money()
    {
        const withdraw_money = Number(await ui._ask("Money withdraw: "));

        if (withdraw_money <= 0 || Number.isNaN(withdraw_money))
        {
            console.log("Error withdraw");
        }
        else 
        {
            this.balance -= withdraw_money;
            this._show_balance();
        }
    }

    async _transfer_money()
    {
        const receiver = await ui._ask("Receiver: ");
        const transfer_money = Number(await ui._ask("Money transfer: "));

        console.log(this.bank._transfer_money(this , receiver , transfer_money));
    }

    async _handle_choice(choice)
    {   
        switch (choice)
        {
            case 1:
                this._show_info();
                break;
            case 2:
                this._show_balance();
                break;
            case 3:
                await this._deposit_money();
                break
            case 4:
                await this._withdraw_money();
                break
            case 6:
                await this._transfer_money();
                break;
        }
    }
};

export default
{
    User
};