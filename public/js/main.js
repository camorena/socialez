$(".input").blur(function() {
  event.preventDefault();
  var $this = $(this);
  if ($this.val()) $this.addClass("used");
  else $this.removeClass("used");
});

$("#tab1").on("click", function() {
  event.preventDefault();
  $("#tab1").addClass("login-shadow");
  $("#tab2").removeClass("signup-shadow");
});

$("#tab2").on("click", function() {
  event.preventDefault();
  $("#tab2").addClass("signup-shadow");
  $("#tab1").removeClass("login-shadow");
});

$("#signin-btn").on("click", function() {
  event.preventDefault();
  var credentials = {
    userid: $("#singnin-id")
      .val()
      .trim(),
    psw: $("#singnin-psw")
      .val()
      .trim()
  };
  $.ajax("/api/login/", {
    type: "POST",
    data: credentials
  }).then(function(data) {
    sessionStorage.clear();
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("usrId", data.userid);
    sessionStorage.setItem("usrName", data.name);
    sessionStorage.setItem("usrAvatar", data.avatarUrl);
    autenticatedUser();
    location.reload();
  });
});

$("#signout-btn").on("click", function() {
  event.preventDefault();
  sessionStorage.clear();
  AutenticatedUser();
  location.reload();
});

$("#confirmsignup").on("click", function() {
  event.preventDefault();
  var data = {
    name:
      $("#userFirst")
        .val()
        .trim() +
      " " +
      $("#userLast")
        .val()
        .trim(),
    userid: $("#userid")
      .val()
      .trim(),
    psw: $("#psw")
      .val()
      .trim()
  };
  $.ajax("/api/signup/", {
    type: "POST",
    data: data
  }).then(function(data) {
    //console.log(data);
    sessionStorage.clear();
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("usrId", data.userid);
    sessionStorage.setItem("usrName", data.name);
    sessionStorage.setItem("usrAvatar", data.avatarUrl);
    autenticatedUser();
    location.reload();
  });
});

function formatToUnits(number, precision) {
  const abbrev = ["", "k", "m", "b", "t"];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
}

function storePostId(id) {
  if (!sessionStorage.setItem("postId", id)) {
    window.location.href = "/";
  }
}

function getPostId() {
  var postId = sessionStorage.getItem("postId");
  if (postId) {
    return postId;
  }
  window.location.href = "/";
}

function getUserId() {
  var userId = sessionStorage.getItem("usrId");
  if (userId) {
    return userId;
  }
  window.location.href = "/";
}
function getId() {
  var userId = sessionStorage.getItem("id");
  if (userId) {
    return userId;
  }
  window.location.href = "/";
}

function autenticatedUser() {
  var $userStatus = $("#user-state");
  var $userName = $("#user-name");
  var $userAvatar = $("#user-avatar").find("img");
  if (!sessionStorage.getItem("usrId")) {
    $userStatus.html("Sign in");
    $userName.html("Login");
    $userAvatar.css("background-image", "url('img/users/2.jpg')");
  } else {
    $userStatus.html("Sign out");
    $userName.html(sessionStorage.getItem("usrId"));
    $userAvatar.attr("src", sessionStorage.getItem("usrAvatar"));
  }
}
