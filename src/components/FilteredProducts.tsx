import type { CollectionEntry } from "astro:content";
import React, { useEffect, useState } from "react";

interface FilteredProductProps {
  categories: CollectionEntry<"category">;
  products: CollectionEntry<"product">;
}

export default function FilteredProducts({
  categories,
  products,
}: FilteredProductProps) {
  const [categoryCollection, setCategoryCollection] =
    useState<CollectionEntry<"category">>();
  const [productCollection, setProductCollection] =
    useState<CollectionEntry<"product">>();
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [productCollectionDisplay, setProductCollectionDisplay] =
    useState<CollectionEntry<"product">>();

  useEffect(() => {
    setCategoryCollection(categories);
    setProductCollection(products);
    setCurrentCategory(categories[0].slug);
  }, []);

  useEffect(() => {
    if (productCollection) {
      const products = [...productCollection].filter(
        (x) => x.data.category.slug === currentCategory
      );

      setProductCollectionDisplay(products);
    }
  }, [currentCategory]);

  return (
    categoryCollection &&
    productCollection &&
    productCollectionDisplay && (
      <>
        <section className="grid grid-rows-[auto_minmax(0,_1fr)] w-full gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <h2 className="p-4 lg:p-0 text-2xl uppercase self-center">
              Productos Destacados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:overflow-hidden gap-2 text-sm text-secondary">
              {categoryCollection.map((i) => (
                <button
                  onClick={() => setCurrentCategory(i.slug)}
                  key={i.slug}
                  className={
                    "flex justify-center break-words py-2 px-4 cursor-pointer rounded-t-md  hover:border-b-primary hover:bg-primary hover:text-white rounded-md" +
                    (currentCategory === i.slug &&
                      "border-b-primary bg-primary text-white")
                  }
                >
                  {i.data.pluralName}
                </button>
              ))}
            </div>
          </div>
          <div className="py-2 grid gap-4 grid-flow-col grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] auto-cols-[minmax(16rem,_1fr)] overflow-x-auto">
            {productCollectionDisplay.map((i) => (
              <a href={`/productos/${i.slug}/`} className="group">
                <article
                  key={i.slug}
                  className="group h-80 grid grid-rows-[minmax(0,_1fr)_auto] border rounded-lg border-secondary cursor-pointer"
                >
                  <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat opacity-50 transition-opacity duration-500 brightness-90 group-hover:brightness-100 group-hover:opacity-100">
                    <img
                      className="w-full h-full object-cover  transition duration-300 ease-in-out group-hover:rotate-6 group-hover:scale-125"
                      src={i.data.image.src}
                      loading="lazy"
                    ></img>
                  </div>
                  <h3 className="capitalize">{i.data.name}</h3>
                </article>
              </a>
            ))}
          </div>
        </section>
      </>
    )
  );
}
