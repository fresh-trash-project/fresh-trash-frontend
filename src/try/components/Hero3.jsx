//* 그림에 id를 지정하고 이동하는 방식. 이건 그림이 많아지면 안좋다.

const Hero = () => {
  return (
    <div className="carousel bg-[var(--green-brunswick)] h-96 w-full">
      <div id="slide1" className="carousel-item relative w-full h-[80%] mt-5">
        <img
          src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-[80%] ml-auto mr-auto"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full h-[80%] mt-5">
        <img
          src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-[80%] ml-auto mr-auto"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full h-[80%] mt-5">
        <img
          src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-[80%] ml-auto mr-auto"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div id="slide4" className="carousel-item relative w-full h-[80%] mt-5">
        <img
          src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-[80%] ml-auto mr-auto"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};
export default Hero;
