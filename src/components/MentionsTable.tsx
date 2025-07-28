import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Mention {
  id: string;
  text: string;
  source: string;
  sentiment: string;
  score: number;
  created_at: string;
}

interface MentionsTableProps {
  mentions: Mention[];
}

const MentionsTable: React.FC<MentionsTableProps> = ({ mentions }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Text</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mentions.map((mention) => (
          <TableRow key={mention.id}>
            <TableCell>{mention.text}</TableCell>
            <TableCell>{mention.source}</TableCell>
            <TableCell>{mention.sentiment}</TableCell>
            <TableCell>{mention.score}</TableCell>
            <TableCell>{new Date(mention.created_at).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MentionsTable;
