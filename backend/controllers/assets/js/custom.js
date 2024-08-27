$(document).ready(function () {
  $(".toggle-btn").on("click", function () {
    $("body").toggleClass("collapse-sidebar");
  });
  $(".menu-overlay,.mobile-menu-close").on("click", function () {
    $("body").removeClass("collapse-sidebar");
  });

  /*>>>> input file <<<<<< */
  $("#FileInput").on("change", function (e) {
    var labelVal = $(".file-title").text();
    var oldfileName = $(this).val();
    var fileName = e.target.value.split("\\").pop();

    if (oldfileName == fileName) {
      return false;
    }

    if (fileName) {
      if (fileName.length > 10) {
        $(".profile-img .file-title").text(fileName);
      } else {
        $(".profile-img .file-title").text(fileName);
      }
    } else {
      $(".profile-img .file-title").text(labelVal);
    }
  });
});
 /*>>>> Password Hide/Show <<<<<< */
 $('.toggle-password').click(function (){
  var passwordInput = $(this).next('input');
  if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
      $(this).removeClass('close-eye').addClass('open-eye');
  } else {
      passwordInput.attr('type', 'password');
      $(this).removeClass('open-eye').addClass('close-eye');
  }
});
 /*>>>> Sidebar Active/Inactive <<<<<< */
var path = window.location.pathname;
if (path.startsWith('/')) {
  path = path.substring(1);
}
var page = path.split('/')[2] || path.split('/')[1];
$('.dash-sidebar ul li').removeClass('active');
if (page) {
  $('#' + page).addClass('active');
}

  /*>>>> Form Validations <<<<<< */
(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()