class Vaccine{
    constructor (name, manufacturer, dose_Required, timeFrame, description){
        this.name=name;
        this.manufacturer=manufacturer;
        this.dose_Required=dose_Required;
        this.timeFrame=timeFrame;
        this.description=description;
        this.Availability=true;
    }
}

module.exports=Vaccine;