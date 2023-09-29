export const useRouter = jest.fn();

export const push = jest.fn();
export const replace = jest.fn();
export const pathname = "/";

useRouter.mockImplementation(() => ({
  push,
  replace,
  pathname,
}));

export { useRouter, push };
