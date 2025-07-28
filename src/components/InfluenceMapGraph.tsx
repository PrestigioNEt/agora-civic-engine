import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface Node {
  id: string;
  name: string;
  type: string;
  followers: number;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

interface InfluenceMapGraphProps {
  influencers: Node[];
  connections: Link[];
}

const InfluenceMapGraph: React.FC<InfluenceMapGraphProps> = ({ influencers, connections }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const nodes = influencers.map(i => ({
      id: i.id,
      name: i.name,
      val: Math.log(i.followers + 1) * 2,
      color: i.type === 'ally' ? '#82ca9d' : '#ca8282',
    }));

    const links = connections.map(c => ({
      source: c.source_id,
      target: c.target_id,
      value: c.strength,
    }));

    setGraphData({ nodes, links });
  }, [influencers, connections]);

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      nodeAutoColorBy="type"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
    />
  );
};

export default InfluenceMapGraph;
