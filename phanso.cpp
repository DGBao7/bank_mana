#include <iostream>

class PS
{
private:
    int tu;
    int mau;

    void _rut_gon();

public:
    void _nhap();
    void _in();
    void _set(int t , int m);

    PS _tong(PS ps);
    PS _hieu(PS ps);
    PS _tich(PS ps);
    PS _thuong(PS ps);

    friend PS operator+(PS ps1 , PS ps2);
    friend PS operator-(PS ps1 , PS ps2);
    friend PS operator*(PS ps1 , PS ps2);
    friend PS operator/(PS ps1 , PS ps2);
    friend bool operator>(PS ps1 , PS ps2);
    friend bool operator<(PS ps1 , PS ps2);

    friend std::istream &operator>>(std::istream &in , PS &ps)
    {
        std::cout << "Nhap tu: ";
        in >> ps.tu;

        std::cout << "Nhap mau: ";
        in >> ps.mau;

        ps._rut_gon();

        return in;
    }
};

void PS::_in()
{
    std::cout << tu << "/" << mau << "\n";
}

void PS::_nhap()
{
    std::cout << "Nhap tu: ";
    std::cin >> tu;
    std::cout << "Nhap mau: ";
    std::cin >> mau;

    _rut_gon();
}

void PS::_rut_gon()
{
    int uc = 2;
    bool tu_nega = false;
    bool mau_nega = false;

    if (tu < 0)
    {
        tu_nega = true;
        tu = -tu;
    }

    if (mau < 0)
    {
        mau_nega = true;
        mau = -mau;
    }

    while (uc <= tu && uc <= mau)
    {
        if (tu % uc == 0 && mau % uc == 0)
        {
            tu /= uc;
            mau /= uc;
        }
        else 
        {
            uc += 1;
        }
    }

    if (tu_nega)
    {
        tu = -tu;
    }

    if (mau_nega)
    {
        mau = -mau;
    }
}

PS PS::_tong(PS ps)
{
    PS tong;
    tong.tu = (tu * ps.mau) + (mau * ps.tu);
    tong.mau = mau * ps.mau;

    tong._rut_gon();

    return tong;
}

PS PS::_hieu(PS ps)
{
    PS hieu;
    hieu.tu = (tu * ps.mau) - (mau * ps.tu);
    hieu.mau = mau * ps.mau;

    hieu._rut_gon();

    return hieu;
}

PS PS::_tich(PS ps)
{
    PS tich;
    tich.tu = tu * ps.tu;
    tich.mau = mau * ps.mau;

    tich._rut_gon();

    return tich;
}

PS PS::_thuong(PS ps)
{
    PS thuong;
    thuong.tu = tu * ps.mau;
    thuong.mau = mau * ps.tu;

    thuong._rut_gon();

    return thuong;
}

PS operator+(PS ps1 , PS ps2)
{
    PS tong;
    tong = ps1._tong(ps2);
    
    return tong;
}

PS operator-(PS ps1 , PS ps2)
{
    PS hieu;
    hieu = ps1._hieu(ps2);
    
    return hieu;
}

PS operator*(PS ps1 , PS ps2)
{
    PS tich;
    tich = ps1._tich(ps2);
    
    return tich;
}

PS operator/(PS ps1 , PS ps2)
{
    PS thuong;
    thuong = ps1._thuong(ps2);
    
    return thuong;
}

bool operator>(PS ps1 , PS ps2)
{
    ps1.tu *= ps2.mau;
    ps2.tu *= ps1.mau;

    if (ps1.tu > ps2.tu)
    {
        return true;
    }

    return false;
}

bool operator<(PS ps1 , PS ps2)
{
    ps1.tu *= ps2.mau;
    ps2.tu *= ps1.mau;

    if (ps1.tu < ps2.tu)
    {
        return true;
    }

    return false;
}

void PS::_set(int t , int m)
{
    tu = t;
    mau = m;
}

int main()
{
    PS ps1;
    std::cin >> ps1;

    PS ps2;
    std::cin >> ps2;

    PS tong;
    tong = ps1 + ps2;

    PS hieu;
    hieu = ps1 - ps2;

    PS tich;
    tich = ps1 * ps2;

    PS thuong;
    thuong = ps1 / ps2;

    bool lon_hon = ps1 > ps2;
    bool nho_hon = ps1 < ps2;

    std::cout << "Tong: ";
    tong._in();

    std::cout << "Hieu: ";
    hieu._in();

    std::cout << "Tich: ";
    tich._in();

    std::cout << "Thuong: ";
    thuong._in();

    std::cout << lon_hon << " " << nho_hon;

    std::cout << "\n";

    int n;
    std::cout << "Nhap so phan so: ";
    std::cin >> n;

    PS *ps = new PS[n];

    PS res;
    res._set(0 , 1);

    for (int i = 0; i < n; i ++)
    {
        std::cout << "Nhap phan so thu " << i + 1 << "\n";
        ps[i]._nhap();
        res = res + ps[i];
    }

    std::cout << "Tong cua day phan so la: ";
    res._in();

    delete[] ps;
}