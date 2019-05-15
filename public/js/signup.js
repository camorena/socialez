var $signupBtn = $("#confirmsignup");
var $signinBtn = $("#signin-btn");

$(".input").blur(function() {
  var $this = $(this);
  if ($this.val()) $this.addClass("used");
  else $this.removeClass("used");
});

$("#tab1").on("click", function() {
  $("#tab1").addClass("login-shadow");
  $("#tab2").removeClass("signup-shadow");
});

$("#tab2").on("click", function() {
  $("#tab2").addClass("signup-shadow");
  $("#tab1").removeClass("login-shadow");
});

$signinBtn.on("click", function() {
  event.preventDefault();
  var credentials = {
    userid: $("#singnin-id")
      .val()
      .trim(),
    psw: $("#singnin-psw")
      .val()
      .trim()
  };
  $.ajax("/api/login", {
    type: "POST",
    data: credentials
  }).then(function(data) {
    sessionStorage.usrName = data.name;
    sessionStorage.usrAvatar = data.avatarUrl;
    location.reload();
  });
});
