export function findUser(UserData,accountNo) {
  let flag = [false];
  UserData.forEach((user,idx) => {
    if (user.accountNo === accountNo) {
      flag = [true,idx];
    }
  });
  return flag;
}


export function getUserData(){
  let data = localStorage.getItem('UserData');
  if (data) {
      return JSON.parse(data);
  }
  else return [];
}
