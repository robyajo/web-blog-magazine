import React, { Suspense } from "react";
import TabelData from "./data-table";

export default function VpagePost() {
  return (
    <>
      <div className="w-full max-w-full overflow-x-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <TabelData />
        </Suspense>
      </div>
    </>
  );
}
