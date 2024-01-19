import React from "react";

export default function RightSideBar() {
  return (
    <div className="sticky right-0 top-0 z-20 h-screen items-center py-6 flex flex-col gap-10 max-w-64  w-full max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h4>Following</h4>
        <div>map following</div>
      </div>
      <div className="flex flex-col gap-4">
        <h4>Suggested people</h4>
        <div>map following</div>
      </div>
    </div>
  );
}
