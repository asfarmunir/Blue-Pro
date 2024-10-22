import Inventory from "@/components/dashboard/Inventory";
import { getAllProducts } from "@/database/actions/product.action";

import { getAllRewards } from "@/database/actions/reward.action";
import React from "react";

const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const productPage = Number(searchParams.productPage) || 1;
  const allProducts = await getAllProducts({
    productPage,
    limit: 5,
  });
  const allRewards = await getAllRewards({ page, limit: 5 });
  console.log("🚀 ~ page ~ allProducts:", allProducts);
  return (
    <Inventory
      products={allProducts.products}
      rewards={allRewards.rewards}
      totalRewards={allRewards.totalEntries}
      rewardPage={page}
      totalRewardPages={allRewards.totalPages}
      totalProducts={allProducts.totalEntries}
      productPage={productPage}
      totalProductPages={allProducts.totalPages}
    />
  );
};

export default page;
