class PatientSchedule {
    constructor(patient, vaccine, timeSlot,onHold) {
        this.patient = patient;
        this.vaccine = vaccine;
        this.timeSlot = timeSlot;
        this.onHold=onHold;
        this.scheduleId = null; // Initialize the property here or set it in a method
    }

    setScheduleId(scheduleId) {
        this.scheduleId = scheduleId;
    }
}
module.exports = PatientSchedule;