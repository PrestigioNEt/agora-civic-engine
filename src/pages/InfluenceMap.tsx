import React, { useEffect, useState } from 'react';
import InfluenceMapGraph from '@/components/InfluenceMapGraph';
import PixelTrackingTable from '@/components/PixelTrackingTable';

const InfluenceMap = () => {
  const [influencers, setInfluencers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pixelData, setPixelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const influencersResponse = await fetch('/api/influence-map/influencers');
      const influencersData = await influencersResponse.json();
      setInfluencers(influencersData);

      const connectionsResponse = await fetch('/api/influence-map/connections');
      const connectionsData = await connectionsResponse.json();
      setConnections(connectionsData);

      const pixelDataResponse = await fetch('/api/pixel-tracking/pixel-data');
      const pixelData = await pixelDataResponse.json();
      setPixelData(pixelData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Influence Map</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 border rounded-lg">
          <InfluenceMapGraph influencers={influencers} connections={connections} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Pixel Tracking</h2>
          <PixelTrackingTable pixelData={pixelData} />
        </div>
      </div>
    </div>
  );
};

export default InfluenceMap;
