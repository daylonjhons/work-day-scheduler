// wait for the document to be fully loaded before executing any javascript
$(function () {
  // display the current date in the header
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

  // function to color code time blocks based on current time
  function colorCodeTimeBlocks() {
    // get the current hour using dayjs library
    var currentHour = dayjs().hour();

    // loop through each time block
    $(".time-block").each(function () {
      // extract the hour from the block's id
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // compare block hour with current hour and add appropriate class
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // call the function to color code time blocks
  colorCodeTimeBlocks();

  // event listener for save buttons
  $(".saveBtn").on("click", function () {
    // get the text from the textarea and trim any extra spaces
    var text = $(this).siblings(".description").val().trim();
    // get the id of the parent time block
    var blockID = $(this).parent().attr("id");

    // save the text to local storage with the block id as the key
    localStorage.setItem(blockID, text);

    // show a message indicating that the appointment has been added to local storage
    showMessage("Appointment added to <span style='color: red;'>Local Storage</span>");
  });

  // function to display saved events from local storage
  function displaySavedEvents() {
    $(".time-block").each(function () {
      // get the id of the time block
      var blockID = $(this).attr("id");
      // retrieve the saved event from local storage using the block id
      var savedEvent = localStorage.getItem(blockID);

      // if there is a saved event, populate the corresponding textarea
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
        // show a message indicating that the appointment has been loaded from local storage
        showMessage("Appointment loaded from <span style='color: red;'>Local Storage</span>");
      }
    });
  }

  // function to display a temporary message on the page
  function showMessage(message) {
    // create a div element with the message and appropriate styling
    var messageElement = $("<div>").addClass("text-center fs-5").html(message);

    // insert the message before the main container
    $(".container-lg").before(messageElement);

    // remove the message after 5 seconds
    setTimeout(function () {
      messageElement.remove();
    }, 5000);
  }

  // call the function to display saved events
  displaySavedEvents();
});
