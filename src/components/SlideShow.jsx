import React from "react";
import "../css/slideshow.css";

function SlideShow() {
  return (
    <div>
      <div class="slide-show-div">
        <section class="slide-show">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active container-fluid">
                <div class="my-slide">
                  <h1 class="slide1-quote">
                    Confused with the resources around the web. Don't worry we
                    got you covered.
                  </h1>
                </div>
              </div>

              <div class="carousel-item container-fluid">
                <div class="my-slide">
                  <h1 class="slide2-heading">Something's heating up</h1>
                  <p class="slide2-desc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            </div>

            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only"></span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only"></span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SlideShow;
