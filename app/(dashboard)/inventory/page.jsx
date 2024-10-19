import Inventory from "@/components/dashboard/Inventory";
import { getAllProducts } from "@/database/actions/product.action";

import { getAllRewards } from "@/database/actions/reward.action";
import React from "react";

const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const allProducts = await getAllProducts();
  const allRewards = await getAllRewards({ page, limit: 2 });
  return (
    <Inventory products={allProducts.products} rewards={allRewards.rewards} />
  );
};

export default page;
