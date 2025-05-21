import { sendApiRequest } from "@/common/services/api.service";
import { logger } from "@/lib/logger";
import type { UserProfile } from "../types/user.type";

export async function fetchUserProfile() {
  try {
    return await sendApiRequest<UserProfile>("/users/me", {
      withAuthorization: true,
    });
  } catch (error: unknown) {
    logger.error("Failed to fetch user profile", error);
    throw error;
  }
}
