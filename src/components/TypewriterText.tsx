import React, {useEffect, useState} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

const TypewriterText = (props: {text: string; style?: StyleProp<TextStyle>; delay?: number; initialDelay?: number}) => {
  const {text, style, delay = 40, initialDelay = 200} = props;
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    setVisibleCharacters(0);
  }, [text]);

  useEffect(() => {
    if (visibleCharacters >= text.length) {
      return;
    }

    const timeout = setTimeout(
      () => setVisibleCharacters(current => Math.min(current + 1, text.length)),
      visibleCharacters === 0 ? initialDelay : delay,
    );

    return () => clearTimeout(timeout);
  }, [delay, initialDelay, text.length, visibleCharacters]);

  return (
    <Text style={style}>
      <Text>{text.slice(0, visibleCharacters)}</Text>
      <Text style={{color: 'transparent'}}>{text.slice(visibleCharacters)}</Text>
    </Text>
  );
};

export default TypewriterText;
