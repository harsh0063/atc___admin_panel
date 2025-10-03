// src/Componenet/Pricing_Range.jsx
import React, { useState, useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';


const PriceRangeSlider = ({
  min = 0,
  max = 2000,
  step = 1,
  startMin = 0,
  startMax = 200,
  onChange = () => {}, // ✅ Add this line
}) => {
  const sliderRef = useRef(null);
  const [minVal, setMinVal] = useState(startMin);
  const [maxVal, setMaxVal] = useState(startMax);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = noUiSlider.create(sliderRef.current, {
      start: [startMin, startMax],
      connect: true,
      step,
      range: { min, max },
      tooltips: [
        wNumb({ prefix: '$', decimals: 0 }),
        wNumb({ prefix: '$', decimals: 0 }),
      ],
    });

    slider.on('update', (values) => {
      const newMin = Number(values[0].replace(/\$/g, ''));
      const newMax = Number(values[1].replace(/\$/g, ''));
      setMinVal(newMin);
      setMaxVal(newMax);
      onChange(newMin, newMax); // ✅ Call onChange when slider updates
    });

    return () => slider.destroy();
  }, [min, max, step, startMin, startMax, onChange]);

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.set([minVal, maxVal]);
    }
  }, [minVal, maxVal]);
  

  return (
    <div className="space-y-2">
      <div ref={sliderRef} className="h-2 rounded-[12px]" />
      <div className="flex items-center gap-2 pt-[12px]">
        <input
          type="number"
          className="w-full border border-[#d8dfe7] rounded p-2 text-sm"
          min={min}
          max={maxVal}
          step={step}
          value={minVal}
          onChange={(e) => setMinVal(Number(e.target.value))}
        />
        <span className="whitespace-nowrap">to</span>
        <input
          type="number"
          className="w-full border border-[#d8dfe7] rounded p-2 text-sm"
          min={minVal}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => setMaxVal(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
