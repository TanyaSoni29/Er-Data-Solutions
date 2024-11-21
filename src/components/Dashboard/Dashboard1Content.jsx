/** @format */
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const data = [
	{ year: '2014', value: 200 },
	{ year: '2015', value: 400 },
	{ year: '2016', value: 708 },
	{ year: '2017', value: 650 },
	{ year: '2018', value: 700 },
	{ year: '2019', value: 500 },
	{ year: '2020', value: 600 },
	{ year: '2021', value: 800 },
	{ year: '2023', value: 900 },
];

const Dashboard1Content = () => {
	return (
		<div className='p-6 bg-[#F8F9FD] min-h-screen'>
			<h1 className='text-2xl font-semibold mb-6'>Dashboard</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6'>
				{/* Stats Cards */}
				<div className='p-4 bg-white rounded-lg shadow flex items-center space-x-4'>
					<span className='text-green-600 text-3xl'>
						<AiOutlineArrowUp />
					</span>
					<div>
						<p className='text-sm text-gray-500'>Total Investment</p>
						<h2 className='text-xl font-bold'>$350M</h2>
					</div>
				</div>
				<div className='p-4 bg-white rounded-lg shadow flex items-center space-x-4'>
					<span className='text-red-600 text-3xl'>
						<AiOutlineArrowDown />
					</span>
					<div>
						<p className='text-sm text-gray-500'>Product Value</p>
						<h2 className='text-xl font-bold'>13B</h2>
					</div>
				</div>
				<div className='p-4 bg-white rounded-lg shadow flex items-center space-x-4'>
					<span className='text-blue-600 text-3xl'>
						<AiOutlineArrowUp />
					</span>
					<div>
						<p className='text-sm text-gray-500'>Claimed Investment</p>
						<h2 className='text-xl font-bold'>520</h2>
					</div>
				</div>
				<div className='p-4 bg-white rounded-lg shadow flex items-center space-x-4'>
					<span className='text-yellow-600 text-3xl'>
						<AiOutlineArrowDown />
					</span>
					<div>
						<p className='text-sm text-gray-500'>Production Project</p>
						<h2 className='text-xl font-bold'>154</h2>
					</div>
				</div>
				<div className='p-4 bg-white rounded-lg shadow flex items-center space-x-4'>
					<span className='text-purple-600 text-3xl'>
						<AiOutlineArrowUp />
					</span>
					<div>
						<p className='text-sm text-gray-500'>Total Projects</p>
						<h2 className='text-xl font-bold'>2.5M</h2>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
				{/* Chart 1 */}
				<div className='bg-white rounded-lg shadow p-4'>
					<h3 className='text-lg font-bold mb-4'>Portfolio Performance</h3>
					<ResponsiveContainer
						width='100%'
						height={300}
					>
						<LineChart data={data}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='year' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type='monotone
                            '
								dataKey='value'
								stroke='#0071D3'
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Chart 2 */}
				<div className='bg-white rounded-lg shadow p-4'>
					<h3 className='text-lg font-bold mb-4'>Top Assets</h3>
					<ul>
						{[
							{ name: 'Apple', price: '168.71', change: '+14.34%' },
							{ name: 'SpaceX', price: '233.99', change: '+11.24%' },
							{ name: 'Google', price: '2,545.06', change: '-10.21%' },
							{ name: 'Yahoo', price: '261.11', change: '+10.11%' },
						].map((asset, index) => (
							<li
								key={index}
								className='flex justify-between items-center border-b py-2'
							>
								<span>{asset.name}</span>
								<span className='text-gray-500'>${asset.price}</span>
								<span
									className={`${
										asset.change.includes('+')
											? 'text-green-500'
											: 'text-red-500'
									}`}
								>
									{asset.change}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Data Table */}
			<div className='bg-white rounded-lg shadow mt-6 p-4'>
				<table className='table-auto w-full text-left'>
					<thead>
						<tr className='border-b'>
							<th className='p-2'>NAME</th>
							<th className='p-2'>STATUS</th>
							<th className='p-2'>TYPE</th>
							<th className='p-2'>QUANTITY</th>
							<th className='p-2'>PRICE</th>
							<th className='p-2'>DATE</th>
							<th className='p-2'>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{[
							{
								name: 'AMERICAN EXPRESS NATIONAL BANK',
								status: 'VTSAX',
								type: 'Funds Received',
								quantity: '-',
								price: '-',
								date: '06/29/2024',
								action: 'Action',
							},
							{
								name: 'VANGUARD TOTAL STOCK MARKET INDEX ADMIRAL CL',
								status: 'VTSAX',
								type: 'Buy',
								quantity: '807.766',
								price: '$70.52',
								date: '06/26/2024',
								action: 'Action',
							},
						].map((row, index) => (
							<tr
								key={index}
								className='border-b hover:bg-gray-100 text-sm'
							>
								<td className='p-2'>{row.name}</td>
								<td className='p-2'>{row.status}</td>
								<td className='p-2'>{row.type}</td>
								<td className='p-2'>{row.quantity}</td>
								<td className='p-2'>{row.price}</td>
								<td className='p-2'>{row.date}</td>
								<td className='p-2 text-blue-600 cursor-pointer'>
									{row.action}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Dashboard1Content;
