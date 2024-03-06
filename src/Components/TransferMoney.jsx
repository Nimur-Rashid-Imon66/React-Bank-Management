import React, { useEffect, useState } from 'react';
import {findUser,getUserData} from"./UserData.js"
import uniqid from 'uniqid';
import axios from 'axios';

const TransferMoney = () => {
    const [UserData, setUserData] = useState(getUserData()); 
    const [transactionInfo, setTransactionInfo] = useState(
        {
            senderAccountNo: "",
            reciverAccountNo: "",
            amount: "",
            senderCurrencyCode: "USD",
            reciverCurrencyCode: "USD"
        })
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(transactionInfo);   
        let { senderAccountNo, reciverAccountNo, amount, senderCurrencyCode, reciverCurrencyCode } = transactionInfo;
        
        function processTransaction(senderIndex, reciverIndex, senderAmount, reciverAmount) {
            // reciverAmount.toFixed(3)
            if (UserData[reciverIndex].accountBalance[reciverCurrencyCode])
            {
                UserData[reciverIndex].accountBalance[reciverCurrencyCode] += Number(reciverAmount);
                UserData[senderIndex].accountBalance[senderCurrencyCode] -= Number(senderAmount);
            }
            else {
                UserData[reciverIndex].accountBalance[reciverCurrencyCode] = Number(reciverAmount);
                UserData[senderIndex].accountBalance[senderCurrencyCode] -= Number(senderAmount);
            }
            const transactionId = uniqid();
            UserData[reciverIndex].creditHistory[transactionId] = {
                amount: reciverAmount,
                currencyCode: reciverCurrencyCode,
                date: new Date().toLocaleString(),
                type: `Recived from ${senderAccountNo}`
                //from:senderAccountNo
            }
            UserData[senderIndex].debitHistory[transactionId] = {
                amount: senderAmount,
                currencyCode: senderCurrencyCode,
                date: new Date().toLocaleString(),
                type: `Send to ${reciverAccountNo}`
                //to:reciverAccountNo
            }
            // 
            setUserData([...UserData])
            setTransactionInfo(
                {
                    senderAccountNo: "",
                    reciverAccountNo: "",
                    amount: "",
                    senderCurrencyCode: "USD",
                    reciverCurrencyCode: "USD"
                }
            )
            alert("success!!!")
        }
       
        if (senderAccountNo === reciverAccountNo)
        {
            alert("Can't allowed self transaction!!!");
            return;
        }
        let flagSender = findUser(UserData, senderAccountNo);
        let flagReciver = findUser(UserData, reciverAccountNo);
        if (!flagSender[0])
        {
            alert("Transection Failed !!Sender account not exists!!!");
            return;  
        }
        if (!flagReciver[0])
        {
            alert("Transection Failed !!Reciver account not exists!!!");
            return;  
        }
        amount = Number(amount)
        if (amount <= 0)
        {
            alert("Transection Failed !!Invalid Amount!!!");
            return;  
        }
       
        if (!UserData[flagSender[1]].accountBalance[senderCurrencyCode]){
            alert("insufficient amount!!!");
            return; 
        }
        if (UserData[flagSender[1]].accountBalance[senderCurrencyCode] < amount){
            alert("insufficient amount!!!");
            return; 
        } 
        
        if (senderCurrencyCode === reciverCurrencyCode)
        {
            processTransaction(flagSender[1], flagReciver[1], amount, amount);
        }
        else {
            axios.get(`https://open.er-api.com/v6/latest/${senderCurrencyCode}`).then(
                (res) => {
                    let unit = res.data.rates[reciverCurrencyCode]
                    console.log(unit);
                    processTransaction(flagSender[1], flagReciver[1], amount, amount*unit);
                }
              )
        }
    }
    useEffect(() => {
        localStorage.setItem('UserData',JSON.stringify(UserData))
    }, [UserData])

    return (
        <div className="text-white">
            <div
                className='bg-gradient-to-t to-amber-200 from-amber-500 px-9 py-5 rounded-xl'>
                <h1 className='text-blue-500 text-center  border-b-[4px] pb-2  border-blue-500  text-4xl font-semibold mb-6'> Transfer Money</h1>

                <form className='flex flex-col gap-5 text-black' onSubmit={handleSubmit}>
                  
                    <span>
                        <label >Sender Account No<span className="text-red-500 font-semibold text-xl">*</span></label>
                        <select
                            className='w-[55%] h-[2em] text-lg  px-2 rounded-md ml-2'
                            // defaultValue=""
                            name="senderAcNo"
                            value={transactionInfo.senderAccountNo}
                            onChange={e => { setTransactionInfo({ ...transactionInfo, senderAccountNo: e.target.value }) }}
                        >
                            <option disabled value=""> Select Sender </option>
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

                     <span>
                        <label >Reciver Account No<span className="text-red-500 font-semibold text-xl">*</span></label>
                        <select
                            className='w-[55%] h-[2em] text-lg px-2 rounded-lg ml-2'
                            name="senderAcNo"
                            value={transactionInfo.reciverAccountNo}
                            onChange={e => { setTransactionInfo({ ...transactionInfo, reciverAccountNo: e.target.value }) }}
                        >
                            <option disabled value=""> Select Reciver </option>
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

                    <input
                        className="py-2 px-4 rounded-lg"
                        placeholder='Enter Amount'
                        type="number"
                        value={transactionInfo.amount}
                        required
                    onChange={e => { setTransactionInfo({ ...transactionInfo, amount: e.target.value})}}
                    />


                    <span className="py-2 px-4 bg-white rounded-lg">
                        Select Sender Currency Code:
                        <select
                            className="ml-6 py-2 px-4 border"
                            value={transactionInfo.senderCurrencyCode}
                            onChange={e => setTransactionInfo({ ...transactionInfo, senderCurrencyCode: e.target.value })}
                        >
                            <option value="USD">USD </option>
                            <option value="BDT">BDT</option>
                            <option value="EUR ">EUR </option>
                            <option value="INR ">INR </option>
                        </select>
                    </span>

                    <span className="py-2 px-4 bg-white rounded-lg">
                        Select Reciver Currency Code:
                        <select
                            className="ml-6 py-2 px-4 border"
                            value={transactionInfo.reciverCurrencyCode}
                            onChange={e => setTransactionInfo({ ...transactionInfo, reciverCurrencyCode: e.target.value })}
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

export default TransferMoney;