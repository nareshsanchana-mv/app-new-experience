import React, { ComponentType, useCallback, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function withFadeOnFocus<P extends object>(Wrapped: ComponentType<P>) {
  return function FadeOnFocus(props: P) {
    const opacity = useRef(new Animated.Value(0)).current;

    useFocusEffect(
      useCallback(() => {
        opacity.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }).start();
      }, [opacity])
    );

    return (
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <Wrapped {...props} />
      </Animated.View>
    );
  };
}
