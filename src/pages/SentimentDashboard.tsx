import React, { useEffect, useState } from 'react';
import SentimentChart from '@/components/SentimentChart';
import MentionsTable from '@/components/MentionsTable';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SentimentDashboard = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [mentions, setMentions] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSentimentData = async () => {
      const { data, error } = await supabase
        .from('sentiment_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sentiment data:', error);
        return;
      }

      // Procesar datos para el gráfico
      const chartData = data.reduce((acc, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date, positive: 0, negative: 0, neutral: 0 };
        }
        acc[date][item.sentiment]++;
        return acc;
      }, {});

      setSentimentData(Object.values(chartData));
      setMentions(data);
    };

    fetchSentimentData();

    const interval = setInterval(async () => {
      const response = await fetch('/api/sentiment/check-alerts');
      const newNegativeMentions = await response.json();

      if (newNegativeMentions.length > 0) {
        toast({
          title: "Alerta de sentimiento negativo",
          description: `Se han detectado ${newNegativeMentions.length} nuevas menciones negativas.`,
          variant: "destructive",
        });
      }
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis Dashboard</h1>
      <div className="mb-8">
        <SentimentChart data={sentimentData} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Mentions</h2>
        <MentionsTable mentions={mentions} />
      </div>
    </div>
  );
};

export default SentimentDashboard;
