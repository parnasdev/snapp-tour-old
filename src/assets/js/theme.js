$(document).ready(function (){
  // mobile-menu
  $(".icon-menu").click(function (){
    $(".menu-box-mobi").slideToggle(500)
    $(".icon-menu").toggleClass("icon-menu-active")
  })

$(".button-down-scroll").click(function (){
  $("html").animate({scrollTop: 400} , 300)
})
})
$(window).scroll(function (){
  if($(this).scrollTop() > 900){
    $(".title-section-two").addClass("title-fixed")
  }else {
    $(".title-section-two").removeClass("title-fixed")
  }
  // -----------------
})
