// Converted jQuery document.ready to vanilla JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set the default time range to "Last 7 Days"
    document.getElementById("time_range_select").value = '7';

    // Call the function to toggle date inputs based on the default selection
    toggleDateInputs();

    // Call the function to set default dates based on the default time range
    setDefaultDates();

    highlightSelectedTable();
});

// Keep all other functions unchanged
function updateDateDisplay() {
    var startDateDisplay = document.getElementById('start_date_display');
    var endDateDisplay = document.getElementById('end_date_display');

    var fromInput = document.getElementById('from_date');
    var toInput = document.getElementById('to_date');

    startDateDisplay.innerText = formatDate(fromInput.value);
    endDateDisplay.innerText = formatDate(toInput.value);
}

function formatDate(dateString) {
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    var formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
}

function toggleDateInputs() {
    var timeRangeSelect = document.getElementById('time_range_select');
    var dateRangeForm = document.getElementById('date_range_form');
    var fromInput = document.getElementById('from_date');
    var toInput = document.getElementById('to_date');

    dateRangeForm.style.display = (timeRangeSelect.value === 'custom') ? 'inline-block' : 'none';
    fromInput.required = (timeRangeSelect.value === 'custom');
    toInput.required = (timeRangeSelect.value === 'custom');
    if (timeRangeSelect.value === 'custom') {
        setDefaultDates();
        updateDateDisplay();
    }
}

function setDefaultDates() {
    var timeRangeSelect = document.getElementById('time_range_select');
    var fromInput = document.getElementById('from_date');
    var toInput = document.getElementById('to_date');

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayISOString = yesterday.toISOString().split('T')[0];

    if (timeRangeSelect.value === '7') {
        setDatesWithLimit(yesterdayISOString, 7, fromInput, toInput);
    } else if (timeRangeSelect.value === '15') {
        setDatesWithLimit(yesterdayISOString, 15, fromInput, toInput);
    } else if (timeRangeSelect.value === '30') {
        setDatesWithLimit(yesterdayISOString, 30, fromInput, toInput);
    }
}

function setDatesWithLimit(today, daysAgo, fromInput, toInput) {
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysAgo);
    fromInput.value = fromDate.toISOString().split('T')[0];
    toInput.value = today;
}

function validateDateRange() {
    var fromInput = document.getElementById('from_date');
    var toInput = document.getElementById('to_date');
    var errorMessage = document.getElementById('date_range_error');

    var fromDate = new Date(fromInput.value);
    var toDate = new Date(toInput.value);

    var sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (fromDate > toDate) {
        errorMessage.innerHTML = 'Invalid date range: "From" date should be before "To" date.';
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.marginTop = '90px';
        errorMessage.style.marginLeft = '-150px';
        errorMessage.style.whiteSpace = 'nowrap';
        errorMessage.style.textAlign = 'center';
        return false;
    }

    if (fromDate < sixtyDaysAgo) {
        errorMessage.innerHTML = 'Date range for custom view cannot be earlier than 60 days.';
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.marginTop = '90px';
        errorMessage.style.marginLeft = '-150px';
        errorMessage.style.whiteSpace = 'nowrap';
        errorMessage.style.textAlign = 'center';
        return false;
    }

    if (toDate > tomorrow) {
        errorMessage.innerHTML = 'Invalid date: "To" date cannot be later than tomorrow.';
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.marginTop = '90px';
        errorMessage.style.marginLeft = '-150px';
        errorMessage.style.whiteSpace = 'nowrap';
        errorMessage.style.textAlign = 'center';
        return false;
    }

    errorMessage.innerHTML = '';
    return true;
}

function submitForm() {
    if (validateDateRange()) {
        // Convert jQuery AJAX to fetch
        const form = document.getElementById('date_range_form');
        const formData = new URLSearchParams(new FormData(form));

        fetch(form.getAttribute('action') + '?' + formData.toString(), {
            method: 'GET',
        })
        .then(response => response.text())
        .then(html => {
            // Create a temporary element to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Find the content box in both current page and response
            const newContent = temp.querySelector('.content-box');
            const currentContent = document.querySelector('.content-box');
            
            if (newContent && currentContent) {
                currentContent.innerHTML = newContent.innerHTML;
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
        
        updateDateDisplay();
    }
}

function highlightSelectedTable() {
    // Assuming table_name is defined in your Django context
    var tableLinks = document.querySelectorAll('.table-link');

    tableLinks.forEach(function(link) {
        if (link.textContent.trim() === selectedTable) {
            link.classList.add('highlight');
            link.style.backgroundColor = 'greenyellow';
            link.style.fontWeight = 'bold';
        }
    });
}

function updateDownloadLink() {
    var timeRange = document.getElementById("time_range_select").value;
    var fromDate = document.getElementById("from_date").value;
    var toDate = document.getElementById("to_date").value;

    var downloadLink = document.getElementById("download_excel_link");
    downloadLink.href = `?download_excel=1&time_range=${timeRange}&from_date=${fromDate}&to_date=${toDate}`;
}