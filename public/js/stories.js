$(document).ready(function() {
  $(".dual-nav").on("shown.bs.collapse", function() {
    $(".dual-navv").collapse("show");
  });
  $(".dual-nav").on("hidden.bs.collapse", function() {
    $(".dual-navv").collapse("hide");
  });

  $("ul.nav li.dropdown").hover(
    function() {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(200)
        .fadeIn(500);
    },
    function() {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(200)
        .fadeOut(500);
    }
  );

  //When distance from top = 250px fade button in/out
  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      $("#scrollup").fadeIn(300);
    } else {
      $("#scrollup").fadeOut(300);
    }
  });

  //On click scroll to top of page t = 1000ms
  $("#scrollup").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  autenticatedUser();

  var userId = getId();

  getUserStories();

  getlikedPosts();

  function getUserStories() {
    $.get("/api/posts/user/" + userId, function(data) {
      console.log(data);
      $("a")
        .filter(".post")
        .each(function(index, element) {
          if (index < 3) {
            $(element).attr("title", data[index].title);
          }
          //console.log("Object <a> : ", element, index);
        });
      $(".creative-img")
        .find("img")
        .each(function(index, element) {
          if (index < 3) {
            $(element)
              .text(data[index].User.name)
              .attr("user", data[index].User.id)
              .attr("src", data[index].imageUrl);
          }
          //console.log("Object <img> : ", element, index);
        });
      $("h3")
        .filter(".t-entry-title")
        .each(function(index, element) {
          if (index < 3) {
            $(element).html(data[index].title);
          }
          // console.log("Object <h3> : ", element, index);
        });
      $(".profile-bg-picture")
        .find("img")
        .each(function(index, element) {
          if (index < 3) {
            $(element)
              .attr("user", data[index].User.id)
              .attr("src", data[index].User.avatarUrl);
          }
          //console.log("Object <author img> : ", element, index);
        });
      $(".author")
        .find(".lead")
        .each(function(index, element) {
          if (index < 3) {
            $(element).html(data[index].User.userid);
          }
          // console.log("Object <author name> : ", element, index);
        });
      $(".author")
        .find(".fa-comments")
        .each(function(index, element) {
          if (index < 3) {
            knum = formatToUnits(data[index].likes, 2);
            $(element)
              .val(knum)
              .attr("post", data[index].id);
          }
        });
      var knum;
      $(".author")
        .find(".fa-eye")
        .each(function(index, element) {
          if (index < 3) {
            knum = formatToUnits(data[index].views, 2);
            $(element)
              .val(knum)
              .attr("post", data[index].id);
          }
        });
    });
  }

  function getlikedPosts() {
    $.get("/api/posts/liked/" + userId, function(data) {
      //console.log(data);
      $(".posted")
        //.filter(".post")
        .each(function(index, element) {
          if (index < 9) {
            $(element).attr("title", data[index].title);
          }
          console.log("Object : ", element, index);
        });
      $(".posted")
        .find(".bg")
        .each(function(index, element) {
          if (index < 9) {
            $(element)
              .html(data[index].User.name)
              .attr("user", data[index].User.id)
              .attr("src", data[index].imageUrl);
          }
          //console.log("Object <img> : ", element, index);
        });
      $(".posted")
        .filter(".t-entry-title")
        .each(function(index, element) {
          if (index < 9) {
            $(element).html(data[index].title);
          }
          // console.log("Object <h3> : ", element, index);
        });
      $(".author")
        .find("img")
        .each(function(index, element) {
          if (index < 9) {
            $(element)
              .attr("user", data[index].User.id)
              .attr("src", data[index].User.avatarUrl);
          }
          //console.log("Object <author img> : ", element, index);
        });
      $(".posted")
        .find(".lead")
        .each(function(index, element) {
          if (index < 9) {
            $(element).text(data[index].User.userid);
          }
          // console.log("Object <author name> : ", element, index);
        });
      $(".author")
        .find(".fa-comments")
        .each(function(index, element) {
          if (index < 9) {
            knum = formatToUnits(data[index].likes, 2);
            $(element).val(knum);
          }
        });
      var knum;
      $(".author")
        .find(".fa-eye")
        .each(function(index, element) {
          if (index < 9) {
            knum = formatToUnits(data[index].views, 2);
            $(element).val(knum);
          }
        });
    });
  }
  $(".creative-post").on("click", function() {
    var postId = $(this)
      .parent()
      .attr("post");
    storePostId(postId);
    window.location.href = "/post";
  });

  $(".fa-eye").on("click", function() {
    var postId = $(this)
      .parent()
      .attr("post");
    API.viewed(postId).then(function(data) {
      knum = formatToUnits(data[0].views, 2);
      var view = document.querySelector("li[post=" + postId + "]");
      console.log(view);
      view[0].html(knum);
    });
  });

  // The API object contains methods for each kind of request we'll make
  var API = {
    viewed: function(id) {
      $.get("/api/posts/views" + id, function(data) {
        knum = formatToUnits(data[0].views, 2);
        var view = document.querySelector("li[post=" + id + "]");
        view[0].html(knum);
      });
    }
  };
});
