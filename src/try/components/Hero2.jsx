import { useState } from 'react';
import { RiArrowRightSFill, RiArrowLeftSFill } from 'react-icons/ri';
import { Carousel } from '../../try/styles(styled-components)/HeroCSS';
import { GoDotFill } from 'react-icons/go';

const Hero = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const prevImage = () => {
    const prevIndex = imageIndex - 1;
    setImageIndex(prevIndex);

    if (prevIndex < 0) return setImageIndex(images.length - 1);
  };

  const nextImage = () => {
    const nextIndex = imageIndex + 1;
    setImageIndex(nextIndex);

    if (nextIndex > images.length - 1) return setImageIndex(0);
  };

  return (
    <Carousel>
      <img src={images[imageIndex]} alt="images" />
      <RiArrowLeftSFill className="left-button" onClick={prevImage} />
      <RiArrowRightSFill className="right-button" onClick={nextImage} />

      <div className="dot-container">
        <GoDotFill className="dot" onClick={() => setImageIndex(0)} />
        <GoDotFill className="dot" onClick={() => setImageIndex(1)} />
        <GoDotFill className="dot" onClick={() => setImageIndex(2)} />
      </div>
    </Carousel>
  );
};
export default Hero;
