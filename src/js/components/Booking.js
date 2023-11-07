import { select, templates } from "../settings.js";
import AmonutWidget from "./AmountWidget.js";

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

        
    }
    initWidgets(){
        const thisBooking = this;

      thisBooking.peopleAmount = new AmonutWidget(
        thisBooking.dom.peopleAmount

      );
      
      thisBooking.dom.peopleAmount.addEventListener('updated', function() {

      });

      thisBooking.hoursAmount = new AmonutWidget(
        thisBooking.dom.hoursAmount
      );
      
      thisBooking.dom.hoursAmount.addEventListener("updated", function (){

      })
    }

}

export default Booking;