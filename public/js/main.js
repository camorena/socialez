function formatToUnits(number, precision) {
  const abbrev = ["", "k", "m", "b", "t"];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
}

function StorePostId(id) {
  if (typeof Storage !== "undefined") {
    sessionStorage.postId = id;
  } else {
    window.location.href = "/";
  }
}

function getStorePostId() {
  if (typeof Storage !== "undefined") {
    return sessionStorage.postId;
  } else {
    window.location.href = "/";
  }
}

function AutenticatedUser() {
  var $userName = $("#avatar w-60");
  var $userAvatar = $("#userAvatar");
  $userName.attr("src", sessionStorage.usrName);
  $userAvatar.attr("src", sessionStorage.usrAvatar);

}
