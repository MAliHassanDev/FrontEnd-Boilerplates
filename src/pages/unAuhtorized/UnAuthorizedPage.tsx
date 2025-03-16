import { Button } from "@/common/components/ui/Button";
import { useNavigate } from "react-router";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  async function goBack() {
    console.log("Go back");
    await navigate(-1);
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
      <h1 className="text-4xl">Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <div className="">
        <Button shape="primary" onClick={goBack} type="button">
          Go Back
        </Button>
      </div>
    </section>
  );
};
