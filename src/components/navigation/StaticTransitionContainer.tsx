import {useCardAnimation} from '@react-navigation/stack';
import {SCREEN_HEIGHT} from '@utils/constants';
import React, {FC} from 'react';
import {Animated} from 'react-native';

export interface Props {
  children: React.ReactNode;
}

/*
  A component that transforms its child node to always be at its final position during react-navigation transitions
*/
const StaticTransitionContainer: FC<Props> = ({children}) => {
  const {current} = useCardAnimation();

  /*
    Transform the component by the navigators transition so that the child is positioned
    statically in it's final position
  */
  const headerTransform = [
    {
      translateY: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_HEIGHT, 0],
        extrapolate: 'clamp',
      }),
    },
  ];

  return (
    <Animated.View style={{transform: headerTransform}}>
      {children}
    </Animated.View>
  );
};

export default StaticTransitionContainer;
