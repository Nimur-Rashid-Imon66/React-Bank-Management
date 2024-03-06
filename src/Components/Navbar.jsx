import React from 'react';
import TransferMoney from './TransferMoney';
import WithdrawMoney from './WithdrawMoney';

const Navbar = ({ toggleNavFlagArray, navFlagArray }) => {
    return (
        <div className="flex gap-2 items-center justify-around absolute p-4 mt-2 top-0 bg-[#69899f] min-w-[60%]  h-[4em] rounded-xl">
            {/* <span className=" text-white">AppifyLab</span> */}

            {
                !navFlagArray[0] && <button className='px-2 py-1.5 text-2xl text-black hover:text-white hover:scale-110' onClick={() => { toggleNavFlagArray(0) }}> Add User </button>
            }
            {
                !navFlagArray[1] && <button className='px-2 py-1.5  text-2xl text-black
                  hover:text-white hover:scale-110' onClick={() => { toggleNavFlagArray(1) }}
                > Add Income </button>
            }

            {
                !navFlagArray[2] && <button className='px-2 py-1.5  text-2xl text-black
                  hover:text-white hover:scale-110' onClick={() => { toggleNavFlagArray(2) }}
                > Show User Info </button>
            }

            {
                !navFlagArray[3] && <button className='px-2 py-1.5  text-2xl text-black
                  hover:text-white hover:scale-110' onClick={() => { toggleNavFlagArray(3) }}
                > Transfer Money </button>
            }
            {
                !navFlagArray[4] && <button className='px-2 py-1.5  text-2xl text-black
                  hover:text-white hover:scale-110' onClick={() => { toggleNavFlagArray(4) }}
                > Withdraw Money</button>
            }
        </div>
    );
};

export default Navbar;