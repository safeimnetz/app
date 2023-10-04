import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TooltipProps, useCopilot} from 'react-native-copilot';
import {Colors} from '../../models/Colors';

const CustomTooltipComponent = ({labels}: TooltipProps) => {
  const {goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep} = useCopilot();

  const handleStop = () => {
    stop();
  };
  const handleNext = () => {
    goToNext();
  };

  const handlePrev = () => {
    goToPrev();
  };

  return (
    <View>
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipText}>{currentStep?.text}</Text>
      </View>
      <View style={[styles.bottomBar]}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <Text style={styles.text}>Überspringen</Text>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Text style={styles.text}>Zurück</Text>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.text}>Weiter</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Text style={styles.text}>Fertig</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipText: {},
  tooltipContainer: {
    flex: 1,
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    marginBottom: 10,
    padding: 5,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default CustomTooltipComponent;
