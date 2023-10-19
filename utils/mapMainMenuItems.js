import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  if (!menuItems) {
    return null;
  }

  return menuItems.map((menuItem) => ({
    id: uuid(),
    destination: menuItem.menuItem.destination?.uri || null,
    label: menuItem.menuItem.label,
  }));
};
