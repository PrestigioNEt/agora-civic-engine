import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface SentimentChartProps {
  data: SentimentData[];
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="positive" stroke="#82ca9d" />
        <Line type="monotone" dataKey="negative" stroke="#ca8282" />
        <Line type="monotone" dataKey="neutral" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SentimentChart;
