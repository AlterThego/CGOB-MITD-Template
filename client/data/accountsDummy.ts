export interface Roles {
  name: string;
  color: string;
}

export interface UserCardType {
  id: number;
  firstname: string;
  lastname: string;
  roles?: Roles[];
  avatarImg: string;
}

export const accountsUserCard: UserCardType[] = [
  {
    id: 1,
    firstname: "Kyle",
    lastname: "Doe",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 2,
    firstname: "Mary",
    lastname: "Smith",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 3,
    firstname: "Zoro",
    lastname: "Brown",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 4,
    firstname: "Benjamin",
    lastname: "Doe",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "224, 142, 69" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 5,
    firstname: "Jane",
    lastname: "Smith",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 6,
    firstname: "Alice",
    lastname: "Brown",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 7,
    firstname: "Catherine",
    lastname: "Doe",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 8,
    firstname: "Daniel",
    lastname: "Smith",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 9,
    firstname: "Alice",
    lastname: "Brown",
    roles: [
      { name: "Administrator", color: "223, 24, 167" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "33, 173, 249" },
      { name: "Moderator", color: "76, 181, 174" },
      { name: "Moderator", color: "224, 142, 69" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 10,
    firstname: "Frank",
    lastname: "White",
    roles: [
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 11,
    firstname: "George",
    lastname: "Black",
    roles: [
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 12,
    firstname: "Hannah",
    lastname: "Green",
    roles: [
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 13,
    firstname: "Ian",
    lastname: "Blue",
    roles: [
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
  {
    id: 14,
    firstname: "Jack",
    lastname: "Yellow",
    roles: [
      { name: "User", color: "224, 142, 69" },
      { name: "Moderator", color: "76, 181, 174" },
    ],
    avatarImg: "https://avatars.githubusercontent.com/u/739984?v=4",
  },
];
