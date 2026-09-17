import {createInterface} from "node:readline/promises";
import {stdin as input , stdout as output} from "node:process";

const rl = createInterface({input , output})

const _ask = async (question) =>
{
    return await rl.question(question);
};

const _show_choices = async () =>
{
    console.log("1. Show info");
    console.log("2. Check balance");
    console.log("3. Deposit money");
    console.log("4. Withdraw money");
    console.log("5. Credit card");
    console.log("6. Transfer money");
    console.log("7. Transaction history");
    console.log("8. Logout");
    console.log("0. Exit");

    const user_choices = Number(await _ask("$: "));

    if (Number.isNaN(user_choices))
    {
        console.log("Please try again");
    }

    return user_choices;
}

export default
{
    _ask ,
    _show_choices
};