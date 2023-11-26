class Patient{
    constructor(SSN, fName, mI, lName, age, gender, race, occupationClass, medicalHistory, phone, address, userName,userPassword){
        this.SSN = SSN; 
        this.fName=fName;
        this.mI = mI;
        this.lName=lName;
        this.age=age;
        this.gender=gender;
        this.race=race;
        this.occupationClass=occupationClass;
        this.medicalHistory=medicalHistory;
        this.phone=phone;
        this.address=address;
        this.userName=userName;
        this.userPassword=userPassword;
    }
}

module.exports = Patient