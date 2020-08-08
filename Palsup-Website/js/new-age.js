(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 48
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  var sendRegisterToAppWaitlistGql = function(email, deviceType) {
    var query =
      "mutation ($email:String, $deviceType:DeviceType){registerToAppWaitlist(email:$email, deviceType:$deviceType)}";
    var body = {
      query: query,
      variables: { email: email, deviceType: deviceType }
    };
    $.ajax("https://api.palsup.com/graphql", {
      type: "post",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      dataType: "json"
    }).fail(function(jqxhr, settings, ex) {
      console.log(JSON.stringify(body));
      console.log("failed, " + ex);
    });
  };

  var registerToWaitlist = function(email, appType) {
    if (email) {
      if (appType === "ios") {
        sendRegisterToAppWaitlistGql(email, "IOS");
        $("#appStoreModal").modal("hide");
      } else if (appType === "android") {
        sendRegisterToAppWaitlistGql(email, "ANDROID");
        $("#googlePlayModal").modal("hide");
      } else {
        console.log("could not register to waitlist. Unknown device");
      }
    }
  };

  $("#appStoreForm").submit(function(e) {
    e.preventDefault();
    registerToWaitlist($("#ios-email").val(), "ios");
  });
  $("#googlePlayForm").submit(function(e) {
    e.preventDefault();
    registerToWaitlist($("#android-email").val(), "android");
  });
})(jQuery); // End of use strict
