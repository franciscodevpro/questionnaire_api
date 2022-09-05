export const validateBearerValueStructure = (bearerValue: string): boolean => {
  if (!bearerValue) return false;

  const [bearer, token] = divideBearerValue(bearerValue as string);
  if (!bearer || !token) return false;

  return true;
};

export const divideBearerValue = (bearerValue: string) => {
  return (bearerValue as string).split(' ') as [string, string];
};

export const getBasicUserPassword = (basic: string) => {
  let buff = Buffer.from(basic, 'base64');
  return buff.toString('ascii').split(':') as [string, string];
};
