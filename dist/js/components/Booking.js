import { select, settings, templates } from "../settings.js";
import utils from '../utils.js'
import AmonutWidget from "./AmountWidget.js";
import DatePicker from "./DatePicker.js";
import HourPicker from "./HourPicker.js";

class Booking {
    constructor(bookElem){
        const thisBooking = this;

        thisBooking.render(bookElem);
        thisBooking.initWidgets();
        thisBooking.getData();
    }
    getData(){
        const thisBooking = this;
        const startDateParams = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
        const endDateParams = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

        const params = {
            bookings: [
              startDateParams,
              endDateParams,
               
            ],
            eventsCurrent: [
                settings.db.notRepeatParam,
                startDateParams,
                endDateParams,
                
            ],
            eventsRepeat: [
                settings.db.repeatParam,
                endDateParams,

            ],

        }
        //console.log('getData params',params);

        const urls = {
            bookings:      settings.db.url + '/' + settings.db.bookings 
                                           + '?' + params.bookings.join('&'),
            eventsCurrent: settings.db.url + '/' + settings.db.events   
                                           + '?' + params.eventsCurrent.join('&'),
            eventsRepeat:  settings.db.url + '/' + settings.db.events   
                                           + '?' + params.eventsRepeat.join('&'),
        };
        Promise.all([
            fetch(urls.bookings),
            fetch(urls.eventsCurrent),
            fetch(urls.eventsRepeat),
        ])
        .then(function(allResponses){
            const bookingsResponse = allResponses[0];
            const eventsCurrentResponse = allResponses[1];
            const eventsRepeatResoinse = allResponses[2];
            return Promise.all([
                bookingsResponse.json(),
                eventsCurrentResponse.json(),
                eventsRepeatResoinse.json(),
            ]);
        })
        .then(function([bookings, eventsCurrent, eventsRepeat]){
            console.log(bookings);
            console.log(eventsCurrent);
            console.log(eventsRepeat);
        });
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
        thisBooking.dom.hourPicker = bookElem.querySelector(select.widgets.hourPicker.wrapper);


        
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