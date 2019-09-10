import React from 'react';
import Segment from './Segment';

export default function App() {
  return <Segment  onPress={ (currentActiveTile) => {
    console.log({currentActiveTile})
  } } tiles={['tile A', 'tile B', 'tile B', 'tile D']} />;
}
