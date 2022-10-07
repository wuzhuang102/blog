import React from 'react';

const style = {
  ImgZoomCon: {
    padding: '10px 0',
  },
  ImgZoomTitle: {
    textAlign: 'center',
  },
};

const ImgZoom = props => (
  <div style={style.ImgZoomCon}>
    <img src={props.src} />
    <h3 style={style.ImgZoomTitle}>{props.title}</h3>
  </div>
);

export default ImgZoom;
