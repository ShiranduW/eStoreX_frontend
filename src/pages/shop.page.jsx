import { useState } from "react";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCards from "./home/components/ProductCards";

function ShopPage() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <main className="container mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold">Shop</h1>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </main>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <main className="container mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold">Shop</h1>
        <p className="text-red-500 mt-4">Error loading products</p>
      </main>
    );
  }

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "all"
        ? true
        : product.categoryId === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  return (
    <main className="container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold">Shop</h1>
      <Separator className="my-4" />
      
      <div className="flex gap-4 mb-6">
        <div className="w-[200px]">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[200px]">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductCards products={filteredProducts} />
    </main>
  );
}

export default ShopPage;