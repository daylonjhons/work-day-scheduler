$(function () {
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

  function colorCodeTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  colorCodeTimeBlocks();

  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val().trim();
    var blockID = $(this).parent().attr("id");

    localStorage.setItem(blockID, text);
  });

  function displaySavedEvents() {
    $(".time-block").each(function () {
      var blockID = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockID);

      $(this).find(".description").val(savedEvent);
    });
  }

  displaySavedEvents();
});