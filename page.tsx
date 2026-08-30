import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, getRelated } from "@/lib/products";
import ProductOptions from "@/components/ProductOptions";
import ProductCard from "@/components/ProductCard";
import { Truck } from "lucide-react";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.images },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {product.images.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl bg-charm-blush ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}
            >
              <Image src={src} alt={`${product.name} - foto ${i + 1}`} fill sizes="600px" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charm-pink font-sans">{product.categoryName}</p>
          <h1 className="font-display font-bold text-3xl text-charm-ink mt-1">{product.name}</h1>
          <p className="text-charm-ink/40 font-sans text-sm mt-1">{product.code}</p>

          <p className="text-charm-ink/70 font-sans mt-5 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <ProductOptions product={product} />
          </div>

          <div className="mt-8 rounded-xl border border-black/10 px-4 py-3 flex items-start gap-3">
            <Truck className="h-5 w-5 text-charm-pink shrink-0 mt-0.5" />
            <p className="text-sm text-charm-ink/70 font-sans">
              Opções de entrega combinadas diretamente com a loja: retirada, entrega local, motoboy ou Correios.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-charm-ink mb-6">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
