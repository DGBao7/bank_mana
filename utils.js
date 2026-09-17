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

export default
{
    _add_dot
};