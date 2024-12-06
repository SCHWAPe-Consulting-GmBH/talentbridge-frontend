import { queryOptions } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { queryKeys } from "./queryKeys";
import { useAuth } from "@/firebase/context/authContext";

export const currentUserQuery = queryOptions({
  queryKey: [queryKeys.getCurrentUserId],
  queryFn: () => {
    // const auth = getAuth();
    // const currentUser = auth.currentUser;
 
    const { currentUser } = useAuth();
    
    
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser;
  }
});
