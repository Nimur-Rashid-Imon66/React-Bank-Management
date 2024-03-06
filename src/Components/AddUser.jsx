import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { findUser, getUserData } from "./UserData.js";


const AddUser = () => {
    const [UserData, setUserData] = useState(getUserData()); 
    const [userInfo,setUserInfo] = useState({name:"",accountNo:"",accountType:"Savings"})
    function handleSubmit(e) {
        e.preventDefault();
        const { name, accountNo, accountType } = userInfo;
        
        if (name == "" || accountNo == "")
        {
            alert("Faild to add user");
            return
        }
        if (Number(accountNo) <=0) {
            alert("Faild to add user !! Invalid account number");
            return
        }
        let flag = findUser(UserData,accountNo);
        
        if (flag[0])
        {
            alert("Account No already exists!!!");
            return
        }
    
        else {
            let user = {
                id: uniqid(),
                accountNo: accountNo,
                name: name,
                accountType: accountType,
                accountBalance: {},
                debitHistory: {},
                creditHistory: {}
            }
            alert("User added Successfully!!!");
            setUserData([...UserData, user]);
            setUserInfo({ name: "", accountNo: "", accountType: "Savings" });
        }
    }


    useEffect(() => {
        localStorage.setItem('UserData',JSON.stringify(UserData))
    }, [UserData])
    
    return (
        <div>
            <div
                className='bg-gradient-to-t to-amber-200 from-amber-500 px-9 py-5 rounded-xl'>
                <h1 className='text-blue-500 text-center  border-b-[4px] pb-2  border-blue-500  text-4xl font-semibold mb-6'> Add User Page </h1>
                <form className='flex flex-col  gap-4 ' onSubmit={handleSubmit}>
                    <input
                        className="py-2 px-4 rounded-lg"
                        placeholder='Enter User Name'
                        value={userInfo.name}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                name: e.target.value
                            })
                        }
                        }
                        required />
                    <input
                        className="py-2 px-4 rounded-lg"
                        placeholder='Enter Account No'
                        type='number'
                        value={userInfo.accountNo}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                accountNo: e.target.value
                            })
                        }
                        }
                        required

                    />
                    <span className="py-2 px-4 bg-white rounded-lg" >
                        Select Account Type:
                        <select
                            className="ml-1 py-2 px-4 border "
                            value={userInfo.accountType}
                            onChange={e => setUserInfo({ ...userInfo, accountType: e.target.value })}
                        >
                            <option value="Savings">Savings </option>
                            <option value="Current">Current</option>
                            <option value="Salary ">Salary </option>
                        </select>
                    </span>
                    <button
                        className='px-2 py-1.5 bg-green-500 text-xl  rounded-lg hover:text-white hover:scale-110'
                    > Submit </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;