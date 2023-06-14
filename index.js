const sendBtn = document.getElementById("btn");
const form = document.getElementById('form');

const dayHolder = document.getElementById("dayHolder");
const dayInput = dayHolder.querySelector("input");
const dayLabel = dayHolder.querySelector("label");
const dayWarningEmptyField = dayHolder.querySelector(".warning-empty-field");
const daySpecificWarning = dayHolder.querySelector(".specific-warning");

const monthHolder = document.getElementById("monthHolder");
const monthInput = monthHolder.querySelector("input");
const monthLabel = monthHolder.querySelector("label");
const monthWarningEmptyField = monthHolder.querySelector(".warning-empty-field");
const monthSpecificWarning = monthHolder.querySelector(".specific-warning");

const yearHolder = document.getElementById("yearHolder");
const yearInput = yearHolder.querySelector("input");
const yearLabel = yearHolder.querySelector("label");
const yearWarningEmptyField = yearHolder.querySelector(".warning-empty-field");
const yearSpecificWarning = yearHolder.querySelector(".specific-warning");

const yearsSpan = document.querySelector('.years span');
const monthsSpan = document.querySelector('.months span');
const daysSpan = document.querySelector('.days span');

const $years = $('.years span');
const $months = $('.months span');
const $days = $('.days span');


sendBtn.addEventListener('click', (event) => {
    event.preventDefault(); // prevent form submission

    // Reset previously used styles
    dayInput.classList.remove('wrong-input');
    dayLabel.classList.remove('wrong-label');
    dayWarningEmptyField.style.display = "none";
    daySpecificWarning.style.display = "none";

    monthInput.classList.remove('wrong-input');
    monthLabel.classList.remove('wrong-label');
    monthWarningEmptyField.style.display = "none";
    monthSpecificWarning.style.display = "none";

    yearInput.classList.remove('wrong-input');
    yearLabel.classList.remove('wrong-label');
    yearWarningEmptyField.style.display = "none";
    yearSpecificWarning.style.display = "none";

  
    const day = form.elements['day'].value;
    const month = form.elements['month'].value;
    const year = form.elements['year'].value;

    // Check if the date is valid
    const date = new Date(year, month - 1, day);
    const isValidDate = date.getFullYear() === Number(year) &&
                        date.getMonth() === Number(month) - 1 &&
                        date.getDate() === Number(day);


    // Check if the date is in the past
    const now = new Date();
    const isPastDate = date < now;

    if (isValidDate && isPastDate) {
        console.log('Date is valid and in the past');
   
        let yearsDiff = new Date().getFullYear() - year;
        let monthsDiff = (new Date().getMonth() + 1) - month; // +1 because months are zero indexed
        let daysDiff = new Date().getDate() - day;

        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            yearsDiff--;
            monthsDiff += 12;
            if (daysDiff < 0) {
              const prevMonthDays = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0).getDate();
              daysDiff += prevMonthDays;
              monthsDiff--;
            }
          } else if (daysDiff < 0) {
            const prevMonthDays = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0).getDate();
            daysDiff += prevMonthDays;
            monthsDiff--;
          }

        console.log(daysDiff, monthsDiff, yearsDiff)

        // Animate the years
        $({ countNum: 0 }).animate({ countNum: yearsDiff }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
            $years.text(Math.round(this.countNum));
            }
        });
        
        // Animate the months
        $({ countNum: 0 }).animate({ countNum: monthsDiff }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
            $months.text(Math.round(this.countNum));
            }
        });
        
        // Animate the days
        $({ countNum: 0 }).animate({ countNum: daysDiff }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
            $days.text(Math.round(this.countNum));
            }
        });

    } else {
        console.log('Date is not valid or not in the past');

        console.log(!day, !day < new Date().getDate())

         // Update styles of invalid inputs
        if (!day) {
            dayInput.classList.add('wrong-input');
            dayLabel.classList.add('wrong-label');
            dayWarningEmptyField.style.display = "unset";
        } else if (!day < new Date().getDate()) {
            dayInput.classList.add('wrong-input');
            dayLabel.classList.add('wrong-label');
            daySpecificWarning.style.display = "unset";
        }

        if (!month) {
            monthInput.classList.add('wrong-input');
            monthLabel.classList.add('wrong-label');
            monthWarningEmptyField.style.display = "unset";
        } else if (!month < new Date().getMonth()) {
            monthInput.classList.add('wrong-input');
            monthLabel.classList.add('wrong-label');
            monthSpecificWarning.style.display = "unset";
        }

        if (!year) {
            yearInput.classList.add('wrong-input');
            yearLabel.classList.add('wrong-label');
            yearWarningEmptyField.style.display = "unset";
        } else if (!year < new Date().getFullYear()) {
            yearInput.classList.add('wrong-input');
            yearLabel.classList.add('wrong-label');
            yearSpecificWarning.style.display = "unset";
        }
    }
});