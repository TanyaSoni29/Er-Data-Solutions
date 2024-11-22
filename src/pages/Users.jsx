/** @format */

import UsersContent from '../components/Users/UsersContent';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import AddNewUser from '../components/Users/AddNewUser';
import { useState } from 'react';
import EditUserFirstContent from '../components/Users/EditUserFirstContent';
import EditUserSecondContent from '../components/Users/EditUserSecondContent';

function Users({ setAddUserData1, setEditUserData1, editUserDate1 }) {
	const [user, setUser] = useState({});
	const [addUserButton, setAddUserButton] = useState(false);
	const [editUserButton, setEditUserButton] = useState(false);
	const [editFirstStepComplete, setEditFirstStepComplete] = useState(false);
	return (
		<div className='flex flex-col md:flex-row h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header />
				<div className='flex-1 overflow-y-auto p-4'>
					{!addUserButton && !editUserButton && (
						<UsersContent
							setAddUserButton={setAddUserButton}
							setEditUserButton={setEditUserButton}
							setUser={setUser}
						/>
					)}
					{addUserButton && !editUserButton && (
						<AddNewUser setAddUserData1={setAddUserData1} />
					)}
					{!addUserButton && editUserButton && !editFirstStepComplete && (
						<EditUserFirstContent
							setEditUserData1={setEditUserData1}
							setEditFirstStepComplete={setEditFirstStepComplete}
							user={user}
						/>
					)}
					{editFirstStepComplete && !addUserButton && editUserButton && (
						<EditUserSecondContent
							editUserDate1={editUserDate1}
							user={user}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Users;
