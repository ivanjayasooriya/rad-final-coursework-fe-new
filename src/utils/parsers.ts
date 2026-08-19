// Backend fields such as contact phone/email lists or role lists sometimes
// arrive as a real array and sometimes as a JSON-encoded string. These
// helpers normalize either shape into a plain string array.

export const parseListField = (data: unknown): string[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data as string);
  } catch {
    return [(data as object).toString()];
  }
};

export const parseRolesList = (rolesData: unknown): string[] => {
  if (!rolesData) return ["USER"];
  if (Array.isArray(rolesData)) return rolesData;
  try {
    return JSON.parse(rolesData as string);
  } catch {
    return [(rolesData as object).toString()];
  }
};
