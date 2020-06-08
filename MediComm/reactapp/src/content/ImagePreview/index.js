
import React from 'react';
import PropTypes from 'prop-types';

import './styles/imagePreview.css';

const ImageDataURI = require('image-data-uri');



export const ImagePreview = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';

  function handleDownload(dataUri){
    
    const fileName = 'decoded-image.png';

    ImageDataURI.outputFile(dataUri, fileName);

    console.log("test");
  };

  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img src={dataUri} />
      <a href={dataUri} download>
        Download
      </a>
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

export default ImagePreview;