import { queryOptions } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { queryKeys } from "./queryKeys";

export const currentUserQuery = queryOptions({
  queryKey: [queryKeys.getCurrentUserId],
  queryFn: () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.uid;
  }
});
