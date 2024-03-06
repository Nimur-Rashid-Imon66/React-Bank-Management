import React, { useEffect, useState } from 'react';
import {findUser,getUserData} from"./UserData.js"
import uniqid from 'uniqid';


const WithdrawMoney = () => {
    const [transactionInfo, setTransactionInfo] = useState({ accountNo: "", amount: "", currencyCode: "USD" })
    const [UserData, setUserData] = useState(getUserData());

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(transactionInfo);
        let { accountNo, amount, currencyCode } = transactionInfo;

        let flag = findUser(UserData, accountNo);
        if (!flag[0]) {
            alert("Transection Failed !! Account not exists!!!");
            return;
        }
        else {
            amount = Number(amount);
            if (amount <= 0) {
                alert("Transection Failed !! Invalid Amount!!!");
                return;
            }
            if (UserData[flag[1]].accountBalance[currencyCode] && UserData[flag[1]].accountBalance[currencyCode] >= Number(amount))
            {
                UserData[flag[1]].accountBalance[currencyCode] -= Number(amount);
                const transactionId = uniqid();
                UserData[flag[1]].debitHistory[transactionId] = {
                        amount: amount,
                        currencyCode: currencyCode,
                        date: new Date().toLocaleString(),
                        type: "Withdrawal"
                }
                alert("Transection Complete Successfully");
                setUserData([...UserData])
                setTransactionInfo({ accountNo: "", amount: "", currencyCode: "USD" })

            }
            else
            {
                alert("Transection Failed !! insufficient Balance!!!");
                return;
            }

           
        }

        
    }

    useEffect(() => {
        localStorage.setItem('UserData', JSON.stringify(UserData))
    }, [UserData])
    return (
        <div>

            <div
                className='bg-gradient-to-t to-amber-200 from-amber-500 px-9 py-5 rounded-xl'>
                <h1 className='text-blue-500 text-center border-b-[4px] pb-2 border-blue-500  text-4xl font-semibold mb-6'> Withdraw Money </h1>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                
                    <span className='w-full'>
                        <label > Enter Account No<span className="text-red-500 font-semibold text-xl">*</span></label>
                        <select
                            className='h-[2em] text-xl px-2 rounded-lg ml-2'
                            name="acNo"
                            value={transactionInfo.accountNo}
                            onChange={e => { setTransactionInfo({ ...transactionInfo, accountNo: e.target.value }) }}
                        >
                            <option disabled value=""> Select  Account </option>
                            {
                                UserData.map((user, idx) => {
                                    return (
                                        <option
                                            key={idx}
                                            className=' text-black '
                                            value={user.accountNo}> {user.accountNo}
                                        </option>)
                                })
                            }

                        </select>
                    </span>
                    <span className="px-2">
                        <label>
                            Enter Amount<span className="text-red-500 font-semibold text-xl">*</span>
                        </label>
                        <input
                            className="py-2 px-4 ml-2 rounded-lg"
                            type='number'
                            name="amount"
                            value={transactionInfo.amount}
                            required
                            onChange={e => { setTransactionInfo({ ...transactionInfo, amount: Number(e.target.value) }) }}
                        />
                    </span>

                    <span>
                        <label >
                            Select Currency Code<span className="text-red-500 font-semibold text-xl">*</span>
                        </label>
                        <select
                            className="ml-6 py-2 px-4 rounded-lg"
                            name="currencyCode"
                            value={transactionInfo.currencyCode}
                            onChange={e => setTransactionInfo({ ...transactionInfo, currencyCode: e.target.value })}
                        >
                            <option value="USD">USD </option>
                            <option value="BDT">BDT</option>
                            <option value="EUR ">EUR </option>
                            <option value="INR ">INR </option>
                        </select>

                    </span>



                    <button className='px-2 py-1.5 bg-green-500 text-xl  rounded-lg hover:text-white hover:scale-110'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WithdrawMoney;