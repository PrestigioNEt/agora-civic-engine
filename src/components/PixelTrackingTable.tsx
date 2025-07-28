import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PixelData {
  influencer_id: string;
  conversions: number;
}

interface PixelTrackingTableProps {
  pixelData: PixelData[];
}

const PixelTrackingTable: React.FC<PixelTrackingTableProps> = ({ pixelData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Influencer ID</TableHead>
          <TableHead>Conversions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pixelData.map((data) => (
          <TableRow key={data.influencer_id}>
            <TableCell>{data.influencer_id}</TableCell>
            <TableCell>{data.conversions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PixelTrackingTable;
