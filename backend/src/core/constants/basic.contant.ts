export const defaultTake = 10;
export const jwtConstant = {
  secret:
    process.env.JWT_SECRET_KEY ||
    'GncXDDmKEeyM85FLa4HdXE9FVaehsqVaDu67YQpnwUxeSzL2DkbzbCgP2qKX2nrG',
  expiresIn: '3h',
};
