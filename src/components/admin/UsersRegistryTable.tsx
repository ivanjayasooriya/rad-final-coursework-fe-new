interface RegistryUser {
  _id: string;
  username: string;
  email: string;
  roles: string[] | string;
}

const UsersRegistryTable = ({ users }: { users: RegistryUser[] }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-black uppercase bg-black text-white px-4 py-1.5 border-4 border-black inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      📋 Live Mainframe Operational Registry ({users.length})
    </h2>
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-yellow-300 border-b-4 border-black text-sm font-black uppercase tracking-wider">
            <th className="p-4 border-r-2 border-black">Database Identity</th>
            <th className="p-4 border-r-2 border-black">Profile Handle</th>
            <th className="p-4 border-r-2 border-black">Email Endpoint</th>
            <th className="p-4">Authorization</th>
          </tr>
        </thead>
        <tbody className="divide-y-4 divide-black text-sm font-bold">
          {users.map((user, idx) => (
            <tr
              key={user._id || idx}
              className="hover:bg-purple-50 transition-colors"
            >
              <td className="p-4 border-r-2 border-black font-mono text-xs">
                {user._id}
              </td>
              <td className="p-4 border-r-2 border-black font-black">
                @{user.username}
              </td>
              <td className="p-4 border-r-2 border-black break-all">
                {user.email}
              </td>
              <td className="p-4">
                <span className="px-2 py-0.5 border-2 border-black bg-purple-200 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {Array.isArray(user.roles) ? user.roles[0] : user.roles}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersRegistryTable;
