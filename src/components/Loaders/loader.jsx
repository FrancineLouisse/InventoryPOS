import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './loader.css'; // same folder

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <DotLottieReact
          src="https://lottie.host/4f7ddb02-5149-449f-bd25-3df9554b079b/7qboyP97i3.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loader;
