import React, { useEffect, useState } from 'react';
import { findUser, getUserData } from "./UserData.js"


const ShowUserInfo = () => {
    const [UserData, setUserData] = useState(getUserData());
    const backupData = getUserData();
    const [ac, setAc] = useState("");
    const [filterAc, setFilterAc] = useState("");
    const [showInfo, setShowInfo] = useState(false)
    const [user, setUser] = useState({})
    const [showTable, setShowTable] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = findUser(UserData, ac);
        if (!flag[0]) {
            alert("Sorry!!! Account not exists!!!");
            setAc("")
            setShowInfo(false)
            setUser({})
            return;
        }
        else {
            setShowInfo(true);
            setShowTable(false);
            setUser(UserData[flag[1]])
        }
    }
    useEffect(() => {
        setUserData(backupData.filter((item) => {
            console.log(backupData)
            return item.accountNo.includes(filterAc)
        }))
      
    },[filterAc])
    return (
        <div className="flex flex-col items-center  bg-black w-full  h-full  my-[120px] ">
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                    <input
                        className="py-2 px-4 rounded-lg"
                        placeholder='Enter Account No'
                        value={ac}
                        required
                        onChange={e => { setAc(e.target.value) }}
                    />
                    <button className=' ml-2 px-2 py-2 bg-green-500 rounded-lg hover:text-white hover:scale-105'>Search</button>
                </form>
                {

                    showTable
                        ? <div className='text-white mt-5'>
                            <table className='my-2 py-4 text-lg '> <tbody>
                                <tr className=" text-center px-2 text-2xl">
                                    <th className=" text-center px-2 border">
                                        <span>Account Number</span>
                                        <input
                                            className=" text-black font-medium px-2 py-1 mx-5 my-2  w-[220px] text-lg rounded-lg"
                                            placeholder="Filter by AC No"
                                            value={filterAc}
                                            onChange={(e) => {
                                                setFilterAc(e.target.value);
                                            }}
                                        />
                                    </th>
                                    <th className=" text-center px-2 border">Name</th>
                                    <th className=" text-center px-2 border">Amount</th>
                                    <th className=" text-center px-2 border">Action </th>
                                </tr>
                                {
                                    UserData.map((item, idx) => {
                                        return <tr key={idx} className=" text-center   px-2 h-[3em] border">
                                            <td className=" text-center px-2 border ">{item.accountNo}</td>
                                            <td className=" text-center px-2 border ">{item.name}</td>
                                            <td className=" text-center px-2 border">
                                                <table className='w-full '>
                                                    <tbody>
                                                        {
                                                            (Object.keys(item.accountBalance).length != 0) ?
                                                                Object.keys(item.accountBalance).map((item2, idx) => {
                                                                    return <td key={idx} className='flex flex-col items-center text-center'>{`${parseFloat(item.accountBalance[item2]).toFixed(2)} ${item2}  `}</td>
                                                                })
                                                                : null
                                                        }
                                                        {
                                                            (!Object.keys(item.accountBalance).length) ? <td colSpan="5" className='text-center'>No Balance Available</td> : null
                                                        }

                                                    </tbody>
                                                </table>

                                            </td>

                                            <td className=" text-center   px-2 border">
                                                <button
                                                    className="px-2 py-1.5 bg-blue-500 rounded-lg hover:scale-110"
                                                    onClick={() => {
                                                        setShowTable(false)
                                                        setAc(item.accountNo)
                                                        setShowInfo(true)
                                                        setUser(UserData[idx])
                                                    }}>Details
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                        : null
                }
            </div>

            {
                showInfo
                    ? <div className='mt-4 flex flex-col gap-1 item-center justify-center p-8 rounded-2xl text-white text-2xl bg-blue-50 relative'>
                        <div className=' flex items-center w-full justify-center'>
                            <span className='text-blue-500 font-semibold text-center mb-3 underline text-4xl '>User Info </span>
                            <button
                                className='bg-black px-3 py-1 text-center text-red-500 absolute right-3 top-3 rounded-[50%] hover:scale-110'
                                onClick={() => {
                                    setAc("")
                                    setShowInfo(false)
                                    setShowTable(true)
                                    setUser({})
                                }}
                            > X </button>
                        </div>

                        <div className='text-black flex justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5 '>
                            <span>Name: </span>
                            <span>{user.name}</span>
                        </div>
                        <div className='text-black flex justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5'>
                            <span>Account No: </span>
                            <span>{user.accountNo}</span>
                        </div>
                        <div className='text-black flex justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5'>
                            <span>Account Type: </span>
                            <span>{user.accountType}</span>
                        </div>
                        <div className='text-black flex flex-col justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5'>
                            <div className='font-semibold text-3xl'>Balance Details: </div>
                            <table className='my-2 py-4'>
                                <tbody>
                                    <tr className=" text-center px-2 border border-black">
                                        <th className=" text-center px-2 py-2 border border-black">Amount</th>
                                        <th className=" text-center py-2  px-2 border border-black">Currency</th>
                                    </tr>
                                    {
                                        (Object.keys(user.accountBalance).length != 0) ?
                                            Object.keys(user.accountBalance).map((item, idx) => {
                                                return <tr key={idx} className=" text-center   px-2">
                                                    <td className=" text-center py-2  px-2 border border-black">{user.accountBalance[item]}</td>
                                                    <td className=" text-center py-2  px-2 border border-black">{item}</td>
                                                </tr>
                                            }) : null
                                    }
                                    {
                                        (!Object.keys(user.accountBalance).length) ? <tr><td colSpan="5" className='text-center'>No Balance Available</td></tr> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='text-black flex flex-col justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5'>
                            <div className='font-semibold text-3xl'>Credit History: </div>
                            <table border={1} className="w-full my-2 py-4">
                                <tbody>
                                    <tr className="">
                                        <th className=" text-center border border-black  px-2">Transaction Id</th>
                                        <th className=" text-center border border-black  px-2">Amount</th>
                                        <th className=" text-center border border-black px-2">Currency</th>
                                        <th className=" text-center border border-black px-2">Date</th>
                                        <th className=" text-center border border-black px-2">Type</th>
                                    </tr>
                                    {
                                        (Object.keys(user.creditHistory).length != 0)
                                            ? Object.keys(user.creditHistory).map((item, idx) => {
                                                return <tr key={idx} className="  text-center px-2">
                                                    <td className="  text-center border border-black px-2">{item}</td>
                                                    {
                                                        Object.keys(user.creditHistory[item]).map((k, i) => {
                                                            // console.log(user.creditHistory[item][k])
                                                            return <td key={i} className=" text-center border border-black px-2">{user.creditHistory[item][k]}</td>
                                                        })
                                                    }
                                                </tr>
                                            }) : null
                                    }
                                    {
                                        (!Object.keys(user.creditHistory).length) ? <tr><td colSpan="5" className='text-center'>No Transaction Available</td></tr> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='text-black flex flex-col justify-between bg-gradient-to-t from-blue-100 to-blue-200 py-1 px-5'>
                            <div className='font-semibold text-3xl'>Debit History: </div>
                            <table border={1} className="w-full my-2 py-4">
                                <tbody>
                                    <tr className="">
                                        <th className=" text-center  border border-black px-2">Transaction Id</th>
                                        <th className=" text-center border border-black  px-2">Amount</th>
                                        <th className=" text-center border border-black px-2">Currency</th>
                                        <th className=" text-center border border-black px-2">Date</th>
                                        <th className=" text-center border border-black px-2">Type</th>
                                    </tr>
                                    {
                                        (Object.keys(user.debitHistory).length != 0)
                                        && Object.keys(user.debitHistory).map((item, idx) => {
                                            return <tr key={idx} className="  text-center px-2">
                                                <td className="  text-center border border-black px-2">{item}</td>
                                                {
                                                    Object.keys(user.debitHistory[item]).map((k, i) => {
                                                        // console.log(user.creditHistory[item][k])
                                                        return <td key={i} className=" text-center border border-black px-2">{user.debitHistory[item][k]}</td>
                                                    })
                                                }
                                            </tr>
                                        })
                                    }
                                    {
                                        (!Object.keys(user.debitHistory).length) ? <tr><td colSpan="5" className='text-center'>No Transaction Available</td></tr> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default ShowUserInfo;