import { logger } from "@/lib/logger";

export const TestComponent = () => {
  logger.info("Rendering Test Component");
  return (
    <div>
      <p></p>
    </div>
  );
};
