(function() {
  var sliderWrapper = document.querySelector('#sliderWrapper ul'),
      items = document.querySelectorAll('#sliderWrapper ul li'),
      len = items.length,
      current = 1,
      delta,
      delayFlag = true,
      showItem = 3,
      timer,
      widthVal,
      cycle,
      first = items[0],
      second = items[1],
      last = items[len-1],
      secondLast = items[len-2],
      leftButton = document.getElementById('prev'),
      rightButton = document.getElementById('next'),
      liWidth = 100; /* 96 + 4 (img width + padding) */

  document.getElementById('sliderWrapper').style.width = (showItem * liWidth) + 'px';

  /* Cloning necessary item(s). If we want to show more than 2 item then we have to clone more accordingly */
  if (showItem < 3) {
    last.parentNode.appendChild(first.cloneNode(true));
    first.parentNode.insertBefore( last.cloneNode(true), first );
  } else if (showItem === 3){
    /* here we want to show 3 item at a time, hence we're cloning 2 items at last and 1 at first */
    last.parentNode.appendChild(first.cloneNode(true));
    secondLast.parentNode.appendChild(second.cloneNode(true));
    first.parentNode.insertBefore( last.cloneNode(true), first );
  }

  /* setting initial position */
  current = 1;
  sliderWrapper.style.left = (-liWidth * 1) + 'px';

  function autoScroll() {
      timer = setInterval(function timer() {
        slide('next', true);
      }, 2000);
  }

  /* initialization */
  autoScroll();
  /* end initialization */
  var handler = function(event) {
      if (event.target !== sliderWrapper) {
        return;
      }


      if (widthVal <= -(liWidth * (len - 1)) && delta === 1) {
        sliderWrapper.classList.remove('animation');
        sliderWrapper.style.left = '0px';
      } else if (widthVal >= -(liWidth) && delta === -1) {
        sliderWrapper.classList.remove('animation');
        sliderWrapper.style.left = (-liWidth * len) + 'px';
      }

      // current += delta;
      // cycle = !!(current === 0 || current > len);

      // if (cycle) {
        /* switching between original and cloned image */
        // current = (current === 0) ? len : 1;
      // }

      delayFlag = true;
      sliderWrapper.removeEventListener(event.type, handler);
  };

  function move(elem) {
    elem.style.left = widthVal + (-liWidth * delta) + 'px';
  }

  function slide(id, isAuto) {
      widthVal = parseInt(sliderWrapper.style.left.match(/^-?\d+/)[0], 10);

      if ( ! delayFlag) {
        return;
      }

      delayFlag = false;
      cycle = false;
      /* in the example  buttons have id "prev" or "nextf" */
      delta = (id === "prev") ? -1 : 1;

      sliderWrapper.classList.add('animation');

      move(sliderWrapper);
   }

   ["transitionend", "webkitTransitionEnd", "mozTransitionEnd"].forEach(function(transition) {
        document.addEventListener(transition, handler, false);
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
})();
