export interface AssignedTo {
	name: string;
	color: string;
}

export interface PermissionsData {
  id: number;
  name: string;
  assignedTo?: AssignedTo[];
  createdAt: string;
  description: string;
	actions?: string;
}

export const permissionsDummy: PermissionsData[] = [
  {
    id: 1,
    name: "View Dashboard",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Moderator", color: "sunflower" },
      { name: "Users", color: "azure" },
    ],
    createdAt: "14 Oct 2024",
    description:
      "Allows user to view the dashboard. Allows user to view the dashboard. Allows user to view the dashboard.",
  },
  {
    id: 2,
    name: "Edit Dashboard",
    assignedTo: [{ name: "Administrator", color: "primary" }],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
    actions: "Admin",
  },
  {
    id: 3,
    name: "Delete Dashboard",
    assignedTo: [{ name: "Administrator", color: "primary" }],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
  },
  {
    id: 4,
    name: "Create Dashboard",
    assignedTo: [{ name: "Administrator", color: "primary" }],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
    actions: "Admin",
  },
  {
    id: 5,
    name: "Manage Users",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Moderator", color: "sunflower" },
    ],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
    actions: "Owner",
  },
  {
    id: 6,
    name: "View Reports",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Moderator", color: "sunflower" },
    ],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
  },
  {
    id: 7,
    name: "View Only",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Restricted User", color: "coral" },
    ],
    createdAt: "14 Oct 2024",
    description: "Allows user to view the dashboard",
  },
  {
    id: 8,
    name: "Permission 8",
    assignedTo: [{ name: "Administrator", color: "primary" }],
    createdAt: "15 Oct 2024",
    description: "Allows user to view the dashboard",
    actions: "Admin",
  },
  {
    id: 9,
    name: "Permission 9",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Moderator", color: "sunflower" },
    ],
    createdAt: "15 Oct 2024",
    description: "Allows user to view the dashboard",
    actions: "Owner",
  },
  {
    id: 10,
    name: "Permission 10",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Moderator", color: "sunflower" },
    ],
    createdAt: "15 Oct 2024",
    description: "Allows user to view the dashboard",
  },
  {
    id: 11,
    name: "Permission 11",
    assignedTo: [
      { name: "Administrator", color: "primary" },
      { name: "Restricted User", color: "coral" },
    ],
    createdAt: "15 Oct 2024",
    description: "Allows user to view the dashboard",
  },
];
