import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "./users.service";

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: false,
    staleTime: Infinity,
  });
}
