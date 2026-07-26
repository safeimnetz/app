import React, {useEffect, useState} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';

const TypewriterText = (props: {text: string; style?: StyleProp<TextStyle>; delay?: number; initialDelay?: number}) => {
  const {text, style, delay = 40, initialDelay = 200} = props;
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let currentCharacter = 0;

    setVisibleCharacters(0);

    const typeNextCharacter = () => {
      currentCharacter += 1;
      setVisibleCharacters(currentCharacter);

      if (currentCharacter < text.length) {
        timeout = setTimeout(typeNextCharacter, delay);
      }
    };

    timeout = setTimeout(typeNextCharacter, initialDelay);

    return () => {
      if (timeout != null) {
        clearTimeout(timeout);
      }
    };
  }, [delay, initialDelay, text]);

  return (
    <View>
      <Text style={[style, {opacity: 0}]}>{text}</Text>
      <Text style={[style, {position: 'absolute', top: 0, left: 0}]}>{text.slice(0, visibleCharacters)}</Text>
    </View>
  );
};

export default TypewriterText;
