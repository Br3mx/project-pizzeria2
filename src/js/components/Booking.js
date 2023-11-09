import { select, templates } from "../settings.js";
import AmonutWidget from "./AmountWidget.js";
import DatePicker from "./DatePicker.js";
import HourPicker from "./HourPicker.js";

class Booking {
    constructor(bookElem){
        const thisBooking = this;

        thisBooking.render(bookElem);
        thisBooking.initWidgets();
    }
    render(bookElem){
        const thisBooking = this;
       

        const generatedHTML = templates.bookingWidget();

        thisBooking.dom = {};

        thisBooking.dom.wrapper = bookElem;
        thisBooking.dom.wrapper.innerHTML = generatedHTML;


        thisBooking.dom.peopleAmount = bookElem.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = bookElem.querySelector(select.booking.hoursAmount);


        thisBooking.dom.datePicker = bookElem.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.HourPicker = bookElem.querySelector(select.widgets.hourPicker.wrapper);


        
    }
    initWidgets(){
        const thisBooking = this;
    // PeopleAmount
      thisBooking.peopleAmount = new AmonutWidget(
        thisBooking.dom.peopleAmount

      );
      
      thisBooking.dom.peopleAmount.addEventListener('updated', function() {

      });
    // HoursAmount
      thisBooking.hoursAmount = new AmonutWidget(
        thisBooking.dom.hoursAmount
      );
      
      thisBooking.dom.hoursAmount.addEventListener("updated", function (){

      })

    // DatePicker
      thisBooking.datePicker = new DatePicker(
        thisBooking.dom.datePicker
      );

      thisBooking.dom.datePicker.addEventListener('updated', function() {

      });
    // HoursPicker
      thisBooking.hourPicker = new HourPicker(
        thisBooking.dom.hourPicker
      );

      thisBooking.dom.hourPicker.addEventListener('updated', function() {

      });

    }

}

export default Booking;