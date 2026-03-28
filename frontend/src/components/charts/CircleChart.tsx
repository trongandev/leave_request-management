import { ResponsiveContainer, PieChart, Pie } from "recharts"

interface Props {
    data: any[]
}

export default function CircleChart({ data }: Props) {
    const renderCenterLabel = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`font-bold  text-primary`}>120</div>
            <div className={` text-primary text-center`}>120</div>
        </div>
    )
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" data={data} fill="#8884d8" label />
                </PieChart>
            </ResponsiveContainer>
            {renderCenterLabel()}
        </div>
    )
}
