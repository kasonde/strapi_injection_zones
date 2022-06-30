import React, { useState } from "react";
import { Button } from "@strapi/design-system/Button";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

const PromoteButton = () => {
  const [loading, setLoading] = useState(false);
  const { modifiedData, slug } = useCMEditViewDataManager();
  const handleClick = async () => {
    setLoading(true);
    await fetch("http://test.kasonde.me/api/promote/injest", {
      method: "POST",
      data: {
        slug,
        data: modifiedData,
      },
    });
    setLoading(false);
  };
  return (
    <Button onClick={handleClick} variant="secondary">
      {loading ? "Loading" : "Promote to Prod"}
    </Button>
  );
};

export default PromoteButton;
