import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  return <div>{params.slug}</div>;
};

export default page;
