angular.module('sliderApp', [])
  .controller('SliderController', function($scope) {
    var current = 1,
        delta,
        delayFlag = true,
        timer,
        leftWidth,
        cycle,
        leftButton = document.getElementById('prev'),
        rightButton = document.getElementById('next'),
        margin = 4, // as we difine in css- 2, hence 2+2
        sliderWrapperUL = document.querySelector('#sliderWrapper ul'),
        items, //document.querySelectorAll('#sliderWrapper ul li'),
        len,
        sliderWrapper,
        sliderArea;

      function calculateLiContainerWidth() {
          var bannerWrapperDivWidth = document.getElementsByClassName('news-wrapper')[0].clientWidth;
          sliderWrapper = document.querySelector('#sliderWrapper');
          // below value will changed according to the screen size
          $scope.numberOfSlides = 3;
          $scope.liWidth = (bannerWrapperDivWidth / $scope.numberOfSlides) - margin;

          sliderWrapper.style.width = ($scope.numberOfSlides * ($scope.liWidth + margin)) + 'px';
      }

      /* After API call */
      $scope.data = ["data-1", "data-2", "data-3", "data-4", "data-5"];
      calculateLiContainerWidth();
      makeClone();
      slidingAnimation();
      actionsHandlers();
      /* end of API call */

      function makeClone() {
        alert('Sliding...');
        var firstElem,
            secondElem,
            lastElem,
            secondLastElem; /* 96 + 4 (img width + padding) */
            //calculateLiContainerWidth();

        sliderWrapperUL = document.querySelector('#sliderWrapper ul');
        items = $scope.data; //document.querySelectorAll('#sliderWrapper ul li'),
        len = items.length;
        sliderArea = document.querySelector('.media-slider-container');

        /* Cloning necessary item(s). If we want to show more than 2 item then we have to clone more accordingly */
        firstElem = $scope.data[0];
        secondElem = $scope.data[1];
        lastElem = $scope.data[$scope.data.length - 1];
        secondLastElem = $scope.data[$scope.data.length - 2];

        if ($scope.numberOfSlides < 3) {
          // last.parentNode.appendChild(first.cloneNode(true));
          // first.parentNode.insertBefore( last.cloneNode(true), first );
          $scope.data.unshift(lastElem);
          $scope.data.push(firstElem);
        } else if ($scope.numberOfSlides === 3){
          /* here we want to show 3 item at a time, hence we're cloning 2 items at last and 1 at first */
          // last.parentNode.appendChild(first.cloneNode(true));
          // secondLast.parentNode.appendChild(second.cloneNode(true));
          // first.parentNode.insertBefore( last.cloneNode(true), first );
          $scope.data.unshift(lastElem);
          $scope.data.push(firstElem);
          $scope.data.push(secondElem);
        }

        /* setting initial position */
        current = 1;
        sliderWrapperUL.style.left = -($scope.liWidth + margin) + 'px';
      }

      function move(elem) {
        elem.style.left = leftWidth + (-$scope.liWidth * delta) - (margin * delta) + 'px';
      }

      function slide(id, isAuto) {
          leftWidth = parseInt(sliderWrapperUL.style.left.match(/^-?\d+/)[0], 10);

          if (! delayFlag) {
            return;
          }

          delayFlag = false;
          cycle = false;
          /* in the example  buttons have id "prev" or "nextf" */
          delta = (id === "prev") ? -1 : 1;

          sliderWrapperUL.classList.add('animation');

          move(sliderWrapperUL);
       }

       function autoScroll() {
         timer = setInterval(function timer() {
           slide('next', true);
         }, 2000);
       }

      function slidingAnimation() {
        /* initialization */
        autoScroll();
        /* end initialization */
        var handler = function(event) {
            if (event.target !== sliderWrapperUL) {
              return;
            }

            if (current === len && delta === 1) {
              sliderWrapperUL.classList.remove('animation');
              sliderWrapperUL.style.left = '0px';
            } else if (current === 1 && delta === -1) {
              sliderWrapperUL.classList.remove('animation');
              sliderWrapperUL.style.left = (-($scope.liWidth + margin) * len) + 'px';
            }

            current += delta;
            cycle = !!(current === 0 || current > len);

            if (cycle) {
              /* switching between original and cloned image */
              current = (current === 0) ? len : 1;
            }

            delayFlag = true;
            sliderWrapperUL.removeEventListener(event.type, handler);
        };

         ["transitionend", "webkitTransitionEnd", "mozTransitionEnd"].forEach(function(transition) {
              document.addEventListener(transition, handler, false);
         });
      }

      function actionsHandlers() {
        // slidingAnimation();

        sliderArea.addEventListener('mouseover', function onMouseHover() {
          clearInterval(timer);
        });

        sliderArea.addEventListener('mouseout', function onMouseHover() {
          autoScroll();
        });

        [leftButton, rightButton].forEach(function (aButton) {
          /* Set button  handlers */
          aButton.addEventListener('click', function (event) {
            var id = event.target.getAttribute('id'); // prev || next
            slide(id, false);
          });

          aButton.addEventListener('mouseover', function onMouseHover() {
            clearInterval(timer);
          });

          aButton.addEventListener('mouseout', function onMouseHover() {
            autoScroll();
          });
        });
      };


  });
