class ResponsePatient{
    constructor(patient){
        this.SSN = patient.SSN; 
        this.fName=patient.fName;
        this.mI = patient.mI;
        this.lName=patient.lName;
        this.age=patient.age;
        this.gender=patient.gender;
        this.race=patient.race;
        this.occupationClass=patient.occupationClass;
        this.medicalHistory=patient.medicalHistory;
        this.phone=patient.phone;
        this.address=patient.address;
        this.userName=patient.userName;
    }
}

module.exports = ResponsePatient