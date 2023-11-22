class Nurse {
    constructor(id, fName, mI, lName, age, gender, phone, address, password) {
      // Check if id is provided, if not, treat it as a regular constructor call
      if (arguments.length === 8) {
        this.fName = id;
        this.mI = fName;
        this.lName = mI;
        this.age = lName;
        this.gender = age;
        this.phone = gender;
        this.address = phone;
        this.password = address;
      } else {
        this.id = id;
        this.fName = fName;
        this.mI = mI;
        this.lName = lName;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.password = password;
      }
    }
  }
  
  module.exports = Nurse;
  