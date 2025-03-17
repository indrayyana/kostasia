const allRoles: Record<string, string[]> = {
  pengunjung: [],
  penyewa: [],
  admin: [
    'getUsers',
    'manageUsers',
    'getRooms',
    'manageRooms',
    'getNotifications',
    'manageNotifications',
    'getTransactions',
    'manageTransactions',
  ],
};

export const Roles = Object.keys(allRoles);
export const RoleRights = allRoles;

