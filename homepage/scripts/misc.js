function $(str) {
  return document.querySelector(str);
}

function assignAttributes(element, attributes) {
  for (let att in attributes) {
    element.setAttribute(att, attributes[att]);
  }
  return element;
}

function icoUrl(url) {
  return `https://logo.clearbit.com/${url}?size=128`;
}

function cleanUrl(url) {
  if (!url.startsWith("https://")) url = "https://" + url;
  return url;
}

function imgurlAutoFill() {
  if (!$("#form-chbx").checked) $("#form-imgurl").value = $("#form-url").value;
}
function getlocal() {
  dashboard.setLibrary(eval(localStorage.getItem(local)));
  dashboard.libString = localStorage.getItem(local);
  dashboard.init();
}
function sceneToggle() {
  let scene = $("#toggle").innerText == "home" ? "edit" : "home";
  $("#toggle").innerText = scene;
  if (scene == "home") {
    dashboard.setLibrary(eval(`[${$("#editor textarea").value}]`));
    dashboard.libString = `[${$("#editor textarea").value}]`;
    localStorage.setItem(local, `[${$("#editor textarea").value}]`);
  } else
    $("#editor textarea").value = dashboard.libString
      .trim()
      .replace(/(^\[)|(\]$)/gm, "");
  $("#editor").classList.toggle("inactive");
  $("#veil").classList.toggle("inactive");
}

$("#editor").addEventListener("keydown", function (e) {
  if (e.which != 9) return;

  var start = e.target.selectionStart;
  var end = e.target.selectionEnd;

  e.target.value =
    e.target.value.substr(0, start) + "\t" + e.target.value.substr(end);
  e.target.selectionStart = e.target.selectionEnd = start + 1;

  e.preventDefault();
  return false;
});
