import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  { name: "Canada", coordinates: [-106.3468, 56.1304] },
  { name: "United States", coordinates: [-95.7129, 37.0902] },
  { name: "Brazil", coordinates: [-51.9253, -14.2350] },
  { name: "Russia", coordinates: [105.3188, 61.5240] },
  { name: "China", coordinates: [104.1954, 35.8617] },
];

const WorldSessionsMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Allow render only after mount
    setIsClient(true);
  }, []);

  return (
    <div className="w-[488px] h-[538px] bg-white rounded-lg  p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-gray-700 font-semibold mb-4">Sessions by Country</h2>

        <div className="bg-[#f7f8fa] rounded-md p-4">
          {isClient && (
            <ComposableMap
              projectionConfig={{ scale: 120 }}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#dfe3e8",
                          stroke: "#c1c7cd",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#dfe3e8",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#dfe3e8",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {markers.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle r={6} fill="#6c757d" stroke="#fff" strokeWidth={2} />
                  <text
                    textAnchor="middle"
                    y={-15}
                    style={{
                      fontFamily: "system-ui",
                      fill: "#5a5a5a",
                      fontSize: "10px",
                    }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldSessionsMap;
