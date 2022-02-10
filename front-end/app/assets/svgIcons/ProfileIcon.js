import * as React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const ProfileIcon = ({color}) => (
  <Svg width={16} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7.997 13.175c-4.313 0-7.997.68-7.997 3.4C0 19.295 3.661 20 7.997 20c4.313 0 7.997-.68 7.997-3.4 0-2.721-3.66-3.425-7.997-3.425Z"
      //   fill={color ? '#8B16FF' : '#B2B9CE'}
      fill={color}
    />
    <Path
      opacity={0.4}
      d="M7.997 10.584a5.273 5.273 0 0 0 5.292-5.292A5.273 5.273 0 0 0 7.997 0a5.274 5.274 0 0 0-5.292 5.292 5.274 5.274 0 0 0 5.292 5.292Z"
      //   fill={color ? '#8B16FF' : '#B2B9CE'}
      fill={color}
    />
  </Svg>
);

export default ProfileIcon;
