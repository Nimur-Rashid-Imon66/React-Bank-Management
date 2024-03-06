import { useState } from "react";
import AddIncome from "./Components/AddIncome";
import AddUser from "./Components/AddUser";
import Navbar from "./Components/Navbar";
import ShowUserInfo from "./Components/ShowUserInfo";
import TransferMoney from "./Components/TransferMoney";
import WithdrawMoney from "./Components/WithdrawMoney";


export default function App() {
  /*
  navFlagArray[
      0:AddUser
      1:AddIncome
      2:Show User Info
      3:Transfer Money
      4:Withdraw Money
  ]
  */
  const [navFlagArray, setNavFlagArray] = useState([0,0,0,0,0]);
  const toggleNavFlagArray = (idx) => {
    let arr = [];
    for (let i = 0; i < navFlagArray.length; i++) {
      if (i == idx) arr.push(1);
      else arr.push(0);
    }
    setNavFlagArray(arr)
  }
  
  return (


    <div className="flex flex-col items-center justify-center gap-2 bg-black w-[100vw] min-h-[100vh] py[120px] relative">

      <Navbar toggleNavFlagArray={toggleNavFlagArray} navFlagArray={navFlagArray} setNavFlagArray={setNavFlagArray}/>
      
      {navFlagArray[0]==1 && <AddUser />}
      {navFlagArray[1]==1 && <AddIncome />}
      {navFlagArray[2]==1 && <ShowUserInfo />}
      {navFlagArray[3]==1 && <TransferMoney />}
      {navFlagArray[4] == 1 && <WithdrawMoney />}
      {
        (navFlagArray[0] == 0 && navFlagArray[1] == 0 && navFlagArray[2] == 0 && navFlagArray[3] == 0 && navFlagArray[4] == 0)
          ? <div className="text-white flex flex-col items-center justify-center gap-6 bg-gray-700 w-[55%] min-h-[20em] rounded-2xl">
            <p className="text-6xl"> AppifyLab Project Bank LTD. </p>
            <p className="text-2xl">WE CODE👨‍💻 YOUR MONEY💸</p>
          </div>
          : null
      }  


    </div>
  )
}