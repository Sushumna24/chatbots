
import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

const getBMICategory = (bmi) => {
  if (isNaN(bmi)) {
    return 'Your input is not valid. Please provide valid height and weight.';
  }
  if (bmi < 18.5) {
    return 'You are underweight.';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'You have a normal weight.';
  } else if (bmi >= 25 && bmi < 30) {
    return 'You are overweight.';
  } else {
    return 'You are obese.';
  }
};

function SampleChatBot() {
  const [heightValue, setHeightValue] = useState('');
  const [weightValue, setWeightValue] = useState('');

  // Load height and weight values from local storage on component mount
  

  // Update height value in state and local storage
  const handleHeightChange = (value) => {
    setHeightValue(parseFloat(value));
    localStorage.setItem('height', parseFloat(value));
  };

  // Update weight value in state and local storage
  const handleWeightChange = (value) => {
    setWeightValue(parseFloat(value));
    localStorage.setItem('weight', parseFloat(value));
  };

  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Hello! What is your name?',
          trigger: 'name',
        },
        {
          id: 'name',
          user: true,
          trigger: 'height',
        },
        {
          id: 'height',
          message: 'Hi {previousValue}! What is your height in centimeters?',
          trigger: 'heightInput',
        },
        {
          id: 'heightInput',
          user: true,
          validator: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid number for height.';
            }
            handleHeightChange(value); // Update height value in state and local storage
            return true;
          },
          trigger: 'weight',
        },
        {
          id: 'weight',
          message: 'What is your weight in kilograms?',
          trigger: 'weightInput',
        },
        {
          id: 'weightInput',
          user: true,
          validator: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid number for weight.';
            }
            handleWeightChange(value); // Update weight value in state and local storage
            return true;
          },
          trigger: 'calculateBMI', // Trigger the calculation after weight is provided
        },
        {
          id: 'calculateBMI',
          message: () => {
           
            const h=localStorage.getItem("height")
            const heightInMeters = h / 100;
            const w=localStorage.getItem("weight")
            const bmi = w / (heightInMeters * heightInMeters);
            const bmiCategory = getBMICategory(bmi);
            localStorage.setItem("bmi",bmi);
            return `Your BMI is ${bmi.toFixed(2)}. ${bmiCategory}`;
          },
          end: true,
        },
      ]}
    />
  );
}

export default SampleChatBot;










