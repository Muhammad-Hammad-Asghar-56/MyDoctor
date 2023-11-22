class Vaccine {
    constructor(id, name, manufacturer, dose_Required, timeFrame, description, Availability = true) {
      // Check if id is provided, if not, treat it as a regular constructor call
      if (arguments.length === 5) {
        // this.id = name;
        this.name = id;
        this.manufacturer = name;
        this.dose_Required = manufacturer;
        this.timeFrame = dose_Required;
        this.description = timeFrame;
        this.Availability = description;

      } else {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.dose_Required = dose_Required;
        this.timeFrame = timeFrame;
        this.description = description;
        this.Availability = Availability;
      }
    }
}

module.exports = Vaccine;
