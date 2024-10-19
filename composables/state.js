export const useUser = () => useState("user", () => ({}));

export const useSetUser = (data) =>
  useState("set-user", () => (useUser().value = data));

export const useSession = () =>
  useState("session", () => ({ pending: true, data: null }));

export const useSetSession = (data) => {
  localStorage.setItem("session", JSON.stringify(data));
  useState("set-session", () => {
    useSession().value.pending = false;
    useSession().value.data = data;
    useUser().value = data?.user;
  });
};
