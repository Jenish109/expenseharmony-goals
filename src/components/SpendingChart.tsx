
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { monthlySpending, categorySpending } from "@/lib/data";
import { cn } from "@/lib/utils";

const COLORS = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#607D8B', '#E91E63', '#00BCD4', '#9E9E9E'];

type ChartType = 'bar' | 'pie';

export function SpendingChart() {
  const [chartType, setChartType] = useState<ChartType>('bar');
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-lg border">
          <p className="text-sm font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm font-semibold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-lg border">
          <p className="text-sm font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm font-semibold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full border animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Spending Overview</CardTitle>
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            <button 
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                chartType === 'bar' 
                  ? "bg-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setChartType('bar')}
            >
              Monthly
            </button>
            <button 
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                chartType === 'pie' 
                  ? "bg-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setChartType('pie')}
            >
              Categories
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-72 w-full">
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlySpending}
                margin={{ top: 20, right: 0, left: 0, bottom: 10 }}
              >
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  fontSize={12}
                  tick={{ fill: '#888' }}
                />
                <YAxis 
                  hide={true}
                  domain={[0, 'dataMax + 500']}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar 
                  dataKey="amount" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                >
                  {monthlySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={entry.amount > 0 ? 0.8 : 0.2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieCustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
