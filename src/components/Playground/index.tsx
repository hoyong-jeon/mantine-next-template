import React from 'react';
import genSynths from '@utils/genSynths';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

interface Props {
  drumkit: any[];
}

export default function Playground({ drumkit }: Props) {
  const piano = genSynths();

  return (
    <>
      <Top />
      <Middle piano={piano.reverse()} drumkit={drumkit} />
      <Bottom />
    </>
  );
}
