declare var $: any;

export var owlJquery = () => {
   $(document).ready(() => {
      "use strict";
      // ===========Featured Owl Carousel============
      var objowlcarousel = $(".owl-carousel-featured");
      if (objowlcarousel.length > 0) {
         objowlcarousel.owlCarousel({
            responsive: {
               0: {
                  items: 2.1,
               },
               600: {
                  items: 3.1,
                  nav: false
               },
               1000: {
                  items: 5,
               },
               1200: {
                  items: 5.4,
               },
            },
            lazyLoad: true,
            pagination: false,
            loop: true,
            dots: true,
            autoPlay: false,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }

      // ===========Featured Owl Carousel============
      var objowlcarousel = $(".owl-carousel-featuredDish");
      if (objowlcarousel.length > 0) {
         objowlcarousel.owlCarousel({
            responsive: {
               0: {
                  items: 2.9,
               },
               600: {
                  items: 3.2,
                  nav: false
               },
               1000: {
                  items: 3.6,
               },
               1200: {
                  items: 4,
               },
            },
            items: 3,
            lazyLoad: true,
            pagination: false,
            loop: false,
            dots: true,
            autoPlay: false,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }

      // ===========Category Owl Carousel============
      var objowlcarousel = $(".owl-carousel-category");
      if (objowlcarousel.length > 0) {
         objowlcarousel.owlCarousel({
            responsive: {
               0: {
                  items: 5,
               },
               600: {
                  items: 6,
                  nav: false
               },
               1000: {
                  items: 8,
               },
               1200: {
                  items: 9,
               },
            },
            items: 8,
            lazyLoad: true,
            pagination: false,
            loop: false,
            dots: true,
            autoPlay: 2000,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }

      // ===========Right Sidebar============
      $('[data-toggle="offcanvas"]').on('click', function () {
         $('body').toggleClass('toggled');
      });

      // ===========Slider============
      var mainslider = $(".owl-carousel-slider");
      if (mainslider.length > 0) {
         mainslider.owlCarousel({
            items: 1,
            dots: true,
            lazyLoad: true,
            pagination: true,
            autoPlay: 4000,
            loop: true,
            singleItem: true,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }

      // ===========Tooltip============
      $('[data-toggle="tooltip"]').tooltip()

      // ===========Single Items Slider============   
      var sync1 = $("#sync1");
      var sync2 = $("#sync2");
      sync1.owlCarousel({
         singleItem: true,
         items: 1,
         rtl: true,
         slideSpeed: 1000,
         pagination: false,
         navigation: true,
         autoPlay: 2500,
         dots: true,
         nav: false,
         navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
         afterAction: syncPosition,
         responsiveRefreshRate: 200,
      });
      sync2.owlCarousel({

         items: 5,
         rtl: true,
         navigation: true,
         dots: true,
         pagination: false,
         nav: true,
         navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
         responsiveRefreshRate: 100,
         afterInit: function (el: any) {
            el.find(".owl-item").eq(0).addClass("synced");
         }
      });

      function syncPosition(this: {
         currentItem: any; singleItem: boolean; items: number; rtl: boolean; slideSpeed: number; pagination: boolean; navigation: boolean; autoPlay: number; dots: boolean; nav: boolean; navigationText: string[]; afterAction: (el: any) => void; responsiveRefreshRate: number;
      }, el: any) {
         var current = this.currentItem;
         $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
         if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
         }
      }
      $("#sync2").on("click", ".owl-item", (e: any) => {
         e.preventDefault();
         var number = $(this).data("owlItem");
         sync1.trigger("owl.goTo", number);
      });

      function center(number: any) {
         var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
         var num = number;
         var found = false;
         for (var i in sync2visible) {
            if (num === sync2visible[i]) {
               var found = true;
            }
         }
         if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
               sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
               if (num - 1 === -1) {
                  num = 0;
               }
               sync2.trigger("owl.goTo", num);
            }
         } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
         } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
         }
      }

   });
}

export var owlJqueryNav = () => {
   $(document).ready(() => {
      "use strict";
      // ===========radio-input Owl Carousel============
      var objowlcarousel = $(".radio-input");
      if (objowlcarousel.length > 0) {
         objowlcarousel.owlCarousel({
            responsive: {
               0: {
                  items: 4,
               },
               600: {
                  items: 4,
               },
               1000: {
                  items: 5,
               },
               1200: {
                  items: 5,
               },
            },
            lazyLoad: true,
            pagination: false,
            loop: false,
            dots: false,
            autoPlay: false,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }
      var objowlcarousel = $(".favs");
      if (objowlcarousel.length > 0) {
         objowlcarousel.owlCarousel({
            responsive: {
               0: {
                  items: 2,
               }
            },
            lazyLoad: true,
            pagination: false,
            loop: false,
            dots: false,
            autoPlay: false,
            navigation: true,
            stopOnHover: true,
            rtl: true,
            nav: false,
            navigationText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
         });
      }
   })
}