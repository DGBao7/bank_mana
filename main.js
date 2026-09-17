import ba from "./bank.js";
import ui from "./ui.js";
import us from "./user.js";

const bank = new ba.Bank("Bon");

let is_user = undefined;
let user_choice = -1;

while (user_choice != 0)
{
    while (!is_user)
    {
        is_user = await bank._login();

        if (!is_user)
        {
            console.log("Account or password wrong");
        }
        else
        {
            console.log("Login successful");
        }
    }

    const user = new us.User(is_user);

    user_choice = await ui._show_choices();

    if (user_choice > 0 && user_choice < 8)
    {
        await user._handle_choice(user_choice);
        bank._save_user(user);
        await ui._ask("Out");
    }
}

process.exit(0);