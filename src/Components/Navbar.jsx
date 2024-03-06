import React from 'react';
import TransferMoney from './TransferMoney';
import WithdrawMoney from './WithdrawMoney';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="flex gap-2 items-center justify-around absolute p-4 mt-2 top-0 bg-[#69899f] min-w-[60%]  h-[4em] rounded-xl">
            <Link to={'/'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Home </button>
            </Link>
            <Link to={'/addUser'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Add User </button>
            </Link>
            <Link to={'/addIncom'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Add Income </button>
            </Link>
            <Link to={'/showUser'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Show User Info </button>
            </Link>
            <Link to={'/transferMoney'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Transfer Money </button>
            </Link>
            <Link to={'/withDrawMoney'}>
                <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110'> Withdraw Money </button>
            </Link>
        </div>
    );
};

export default Navbar;