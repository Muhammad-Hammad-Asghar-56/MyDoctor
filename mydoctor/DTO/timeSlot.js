class Timeslot {
  constructor(timeslotID, startTime, endTime, date, maxCapacity, nurseCount,vaccine,round) {
    if (arguments.length == 8) {
      this.timeslotID = timeslotID;
      this.startTime = startTime;
      this.endTime = endTime;
      this.date = date;
      this.maxCapacity = maxCapacity;
      this.nurseCount = nurseCount;
      this.Vaccine=vaccine;
      this.round=round;
    } else if (arguments.length == 7) {
      this.startTime = timeslotID;
      this.endTime = startTime;
      this.date = endTime;
      this.maxCapacity = date;
      this.nurseCount = maxCapacity;
      this.Vaccine=nurseCount;
      this.round=vaccine;
    }
  }
}
module.exports=Timeslot;