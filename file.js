const wrapper = document.querySelector(".wrapper-list");
const slides = Array.from(wrapper.children);
const prevArrow = document.querySelector(".btn-leftside");
const nextArrow = document.querySelector(".btn-rightside");
const indicators = document.querySelector(".indicator-btns");
const indicatorButtons = Array.from(indicators.children);
const indicatorBtn = document.querySelectorAll("indicator-btn");
const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);
console.log(slides.length-1);
console.log(slides[0].getBoundingClientRect())


//arrange slides next to each other
/*slides[0].style.left = slideWidth * 0 + "px";
slides[1].style.left = slideWidth * 1 + "px";
slides[2].style.left = slideWidth * 2 + "px";
slides[3].style.left = slideWidth * 3 + "px";
slides[4].style.left = slideWidth * 4 + "px";
*/

//rewrite above
/*slides.forEach((slide, index) =>{
    slide.style.left = slideWidth * index + "px";
}) */

/////functions/////

setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

/// use it for each slide
slides.forEach(setSlidePosition);

changeSlides = (wrapper, currentSlide, targetSlide) => {
  wrapper.style.transform = "translateX(-" + targetSlide.style.left + ")";

  currentSlide.classList.remove("list-images-current");
  targetSlide.classList.add("list-images-current");
};

changeButtons = (currentButton, targetButton) => {
  currentButton.classList.remove("indicator-btn-current");
  targetButton.classList.add("indicator-btn-current");
};

changeArrows = (prevArrow, nextArrow, targetIndex, slides) => {
    if (targetIndex === 0) {    //targetIndex == number
        prevArrow.classList.add("disappear");
        nextArrow.classList.remove("disappear");
      } else if (targetIndex === slides.length-1) {
        nextArrow.classList.add("disappear");
        prevArrow.classList.remove("disappear");
      } else {
        prevArrow.classList.remove("disappear");
        nextArrow.classList.remove("disappear");
      }
}

/////event listeners///////

prevArrow.addEventListener("click", (e) => {
  //change all next to previous
  const currentSlide = wrapper.querySelector(".list-images-current");
  const prevSlide = currentSlide.previousElementSibling;

  const currentButton = indicators.querySelector(".indicator-btn-current");
  const prevButton = currentButton.previousElementSibling;

  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  changeSlides(wrapper, currentSlide, prevSlide); //prevSlide becomes targetSlide in function changeSlides()
  changeButtons(currentButton, prevButton);
  changeArrows(prevArrow, nextArrow, prevIndex, slides);
});

nextArrow.addEventListener("click", (e) => {
  const currentSlide = wrapper.querySelector(".list-images-current");
  const nextSlide = currentSlide.nextElementSibling;

  const currentButton = indicators.querySelector(".indicator-btn-current");
  const nextButton = currentButton.nextElementSibling;

  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  changeSlides(wrapper, currentSlide, nextSlide); //nextSlide becomes targetSlide in function changeSlides()
  changeButtons(currentButton, nextButton);
  changeArrows(prevArrow, nextArrow, nextIndex, slides);
});


indicators.addEventListener("click", (e) => {
  const targetButton = e.target.closest("button");
  if (!targetButton) {
    return;
  }
  const currentSlide = wrapper.querySelector(".list-images-current");
  const currentButton = indicators.querySelector(".indicator-btn-current");
  const targetIndex = indicatorButtons.findIndex((btn) => btn == targetButton); 
  console.log(targetButton);
  const targetSlide = slides[targetIndex]; //see changeSlides();

  changeSlides(wrapper, currentSlide, targetSlide);
  changeButtons(currentButton, targetButton);
  changeArrows(prevArrow, nextArrow, targetIndex, slides);
  
});