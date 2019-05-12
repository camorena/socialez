$(document).ready(function() {
  // Getting jQuery references to the comment content, title, form, and post select
  var contentInput = $("#content");
  var cmsForm = $("#cmscom");
  var postSelect = $("#post");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a comment)
  var url = window.location.search;
  var commentId;
  var postId;
  // Sets a flag for whether or not we're updating a comment to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the comment id from the url
  // In '?comment_id=1', commentId is 1
  if (url.indexOf("?comment_id=") !== -1) {
    commentId = url.split("=")[1];
    getCommentData(commentId, "comment");
  }
  // Otherwise if we have an post_id in our url, preset the post select box to be our Post
  else if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
  }

  // Getting the posts, and their comments
  getPosts();

  // A function for handling what happens when the form to create a new comment is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the comment if we are missing a content or post
    if (!contentInput.val().trim() || !postSelect.val()) {
      return;
    }
    // Constructing a newComment object to hand to the database
    var newComment = {
      content: contentInput.val().trim(),
      PostId: postSelect.val()
    };

    // If we're updating a comment run updateComment to update a comment
    // Otherwise run submitComment to create a whole new comment
    if (updating) {
      newComment.id = commentId;
      updateComment(newComment);
    } else {
      submitComment(newComment);
    }
  }

  // Submits a new comment and brings user to comment page upon completion
  function submitComment(comment) {
    $.post("/api/comments", comment, function() {
      window.location.href = "/comments";
    });
  }

  // Gets comment data for the current comment if we're editing, or if we're adding to an post's existing comments
  function getCommentData(id, type) {
    var queryUrl;
    switch (type) {
      case "comment":
        queryUrl = "/api/comments/" + id;
        break;
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.PostId || data.id);
        // If this comment exists, prefill our cms forms with its data
        contentInput.val(data.content);
        postId = data.PostId || data.id;
        // If we have a comment with this id, set a flag for us to know to update the comment
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Posts and then render our list of Posts
  function getPosts() {
    $.get("/api/posts", renderPostList);
  }
  // Function to either render a list of posts, or if there are none, direct the user to the page
  // to create an post first
  function renderPostList(data) {
    if (!data.length) {
      window.location.href = "/posts";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createPostRow(data[i]));
    }
    postSelect.empty();
    console.log(rowsToAdd);
    console.log(postSelect);
    postSelect.append(rowsToAdd);
    postSelect.val(postId);
  }

  // Creates the post options in the dropdown
  function createPostRow(post) {
    var listOption = $("<option>");
    listOption.attr("value", post.id);
    listOption.text(post.title);
    return listOption;
  }

  // Update a given comment, bring user to the comment page when done
  function updateComment(comment) {
    $.ajax({
      method: "PUT",
      url: "/api/comments",
      data: comment
    }).then(function() {
      window.location.href = "/comments";
    });
  }
});
