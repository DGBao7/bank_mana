const _add_dot = (number) =>
{
    number = String(number);
    let result = "";
    let count = 0;

    for (let i = number.length - 1; i >= 0; i --)
    {
        result = number[i] + result;
        count += 1;

        if (count % 3 == 0)
        {
            result = "." + result;
        }
    }

    return result;
}

const _take_date = () =>
{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

const _take_expiry_date = () =>
{
    const date = new Date();
    const year = date.getFullYear() + 1;
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

const _take_paymentDue_date = () =>
{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 3;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

const _create_cardnumber = () =>
{
    let result = "";
    

    for (let i = 0; i < 16; i ++)
    {
        result += String(Math.floor(Math.random() * 10));
    }

    return result;
}

export default
{
    _add_dot ,
    _take_date ,
    _create_cardnumber ,
    _take_expiry_date ,
    _take_paymentDue_date
};