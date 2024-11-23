/** @format */

import { FaUserGroup } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../slices/userSlice';
import ChartImg from '../../assets/Chart.png';

const DashboardContent = () => {
    // Access stats and loading state from Redux
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.user);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return (
        <div className="p-6 bg-gray-100 flex-1 min-h-screen">
            {/* Metrics Section */}
            <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
                {/* Total Users Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:flex-1 h-auto sm:h-36 flex flex-col sm:flex-row justify-between items-center">
                    <span className="rounded-full w-12 h-12 p-3 bg-blue-600 flex justify-center items-center mb-4 sm:mb-0">
                        <FaUserGroup color="white" />
                    </span>
                    <div className="text-center sm:text-right">
                        <h2 className="text-gray-700 font-medium">Total Users</h2>
                        {/* Use Redux stats */}
                        <p className="text-3xl font-bold text-gray-900">
                            {loading ? 'Loading...' : stats.totalUsers}
                        </p>
                    </div>
                </div>

                {/* Client Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:flex-1 h-auto sm:h-36 flex flex-col sm:flex-row justify-between items-center">
                    <span className="rounded-full w-12 h-12 p-3 bg-green-500 flex justify-center items-center mb-4 sm:mb-0">
                        <FaUserGroup color="white" />
                    </span>
                    <div className="text-center sm:text-right">
                        <h2 className="text-gray-700 font-medium">Client</h2>
                        {/* Use Redux stats */}
                        <p className="text-3xl font-bold text-gray-900">
                            {loading ? 'Loading...' : stats.clients}
                        </p>
                    </div>
                </div>

                {/* Dashboard Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:flex-1 h-auto sm:h-36 flex flex-col sm:flex-row justify-between items-center">
                    <span className="rounded-full w-12 h-12 p-3 bg-yellow-500 flex justify-center items-center mb-4 sm:mb-0">
                        <FaUserGroup color="white" />
                    </span>
                    <div className="text-center sm:text-right">
                        <h2 className="text-gray-700 font-medium">Dashboard</h2>
                        {/* Use Redux stats */}
                        <p className="text-3xl font-bold text-gray-900">
                            {loading ? 'Loading...' : stats.dashboardsCount}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Status Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full sm:w-[39rem] sm:h-[20.2rem] flex flex-col justify-start items-center">
                <h2 className="text-gray-700 font-medium text-lg w-full text-left mb-4 border-l-4 pl-2 border-blue-700">
                    Recent Status
                </h2>
                <div className="w-full flex justify-center items-center">
                    {/* Chart image placeholder */}
                    <img
                        src={ChartImg}
                        alt="Chart"
                        className="w-full h-auto rounded-md shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
