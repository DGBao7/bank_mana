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
        this.transaction_history = info.transactionHistory;

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

    _show_transaction_history()
    {
        console.log(this.transaction_history);
    }

    async _deposit_money()
    {
        const deposit_money = Number(await ui._ask("Money deposit: "));

        this.balance = this.bank._deposit_money(this , deposit_money);

        this._show_balance();
    }

    async _withdraw_money()
    {
        const withdraw_money = Number(await ui._ask("Money withdraw: "));

        if (withdraw_money > this.balance)
        {
            console.log("You cheap fuck");
            return 
        }

        this.balance = this.bank._withdraw_money(this , withdraw_money);

        this._show_balance();
    }

    async _transfer_money()
    {
        const receiver = await ui._ask("Receiver: ");
        const transfer_money = Number(await ui._ask("Money transfer: "));
        const description = await ui._ask("Description: ");

        if (transfer_money > this.balance)
        {
            console.log("You cheap fuck");
            return;
        }

        console.log(this.bank._transfer_money(
            this , receiver , transfer_money , description
        ));
    }

    _if_own_creditcard()
    {
        return this.creditCard;
    }

    async _ask_create_creditcard()
    {
        return await ui._ask("Do you want to create one? (y/n): ");
    }

    _check_creditscore()
    {
        return (this.creditScore >= 800) ? true : false;
    }

    _create_creditcard()
    {
        this.bank._create_creditcard(this);
        console.log("Create successfully");
    }

    _show_creditCard()
    {
        console.log(this.creditCard);
    }

    async _credit_card()
    {
        if (!this._if_own_creditcard())
        {
            console.log("You dont have credit card");

            const user_choice = await this._ask_create_creditcard()

            if (user_choice == "n")
            {
                return;
            }
            else if (user_choice == "y")
            {
                if (this._check_creditscore())
                {
                    this._create_creditcard();
                }
                else
                {
                    console.log("Not worthy");
                    return;
                }
            }
            else 
            {
                console.log("Error");
                return;
            }
        }
        else 
        {
            this._show_creditCard();
        }
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
                break;
            case 4:
                await this._withdraw_money();
                break;
            case 5:
                await this._credit_card();
                break;
            case 6:
                await this._transfer_money();
                break;
            case 7:
                this._show_transaction_history();
                break;
            case 8:
                break;
        }
    }
};

export default
{
    User
};