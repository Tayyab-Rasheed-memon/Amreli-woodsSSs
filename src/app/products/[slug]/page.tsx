//Hackathone-3\src\app\products\[card_id]\page.tsx
import AboutUs from '@/components/AboutUs';
import Product from "@/components/Products";
import { client } from '@/sanity/lib/client'
import Image from 'next/image'

interface Params {
  params: Promise<{ slug: string }>; 
}

export default async function details({ params }: Params) {
  const { slug } = await params;

  console.log('Fetching details for product with slug:', slug);

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug] {
      _id,
      name,
      slug,
      "imageUrl": image.asset->url,
      price,
      quantity,
      tags,
      description,
      features,
      dimensions {
        height,
        width,
        depth
      },
      category-> {
        name
      }
    }`,
    { slug }
  );

  console.log('Fetched product data:', product);

  if (!product || product.length === 0) {
    return <div>Product not found.</div>;
  }

  const currentProduct = product[0];

  return (
    <>

      <section className='w-full flex flex-col md:flex-row mb-10 md:p-5 bg-gray-50 rounded-lg shadow-lg'>
        {/* Display product image */}
        <div className='flex justify-center w-full md:w-1/2'>
          <Image
            src={currentProduct.imageUrl || '/default-image.jpg'}
            alt={currentProduct.name}
            layout='responsive'
            className='rounded-lg md:w-[500px] md:h-[500px]  '
            width={200}
            height={200}
          />
        </div>
        <div className='lg:py-[51px] py-[28px] px-[24px] lg:px-[62px] space-y-8 w-full md:w-1/2'>
          <div className='flex flex-col gap-3'>
            <h1 className="lg:text-[36px] text-[28px] font-bold leading-[44.6px] text-[#2A254B] hover:text-blue-600 transition-colors duration-200">{currentProduct.name}</h1>
            <p className='text-[24px] font-semibold leading-[34.2px] text-[#12131A]'>£{currentProduct.price}</p>
          </div>

          <div className='mt-7 lg:mt-[54px] flex flex-col gap-3 lg:gap-4'>
            <h2 className='text-[20px] leading-[22px] text-[#2A254B] font-semibold'>Product description</h2>
            <p className='text-[16px] leading-[21px] text-[#2A254B]'>
              {currentProduct.description}
            </p>
            <div className="text-[20px]">
              <h2 className='text-[20px] leading-[22px] text-[#2A254B] font-semibold'>Tags:</h2>
              <p className='text-[16px] leading-[21px] text-[#2A254B]'>
                {currentProduct.tags.join(", ")}</p>
            </div>
          </div>

          <div className='flex flex-col gap-7 text-[#2A254B]'>
            <h2 className='text-[20px] leading-[22px] text-[#2A254B] font-semibold'>Dimensions</h2>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-[15px]'>
                <h3 className='text-sm leading-[19.6px]'> Height</h3>
                <p className='text-[#505977] text-[14px] leading-[21.6px]'>{currentProduct.dimensions.height}</p>
              </div>
              <div className='flex flex-col gap-[15px]'>
                <h3 className='text-sm leading-[19.6px]'> Width</h3>
                <p className='text-[#505977] text-[14px] leading-[21.6px]'>{currentProduct.dimensions.width}  </p>
              </div>
              <div className='flex flex-col gap-[15px]'>
                <h3 className='text-sm leading-[19.6px]'> Depth</h3>
                <p className='text-[#505977] text-[14px] leading-[21.6px]'>{currentProduct.dimensions.depth}</p>
              </div>
            </div>
          </div>

          {currentProduct.features && (
            <div>
              <h2 className='text-[20px] leading-[22px] text-[#2A254B] mb-3 font-semibold'>Features:</h2>
              <ul className='list-disc pl-5'>
                {currentProduct.features.map((feature: string, index: number) => (
                  <li className='text-[16px] leading-[21px] text-[#2A254B]' key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='flex gap-2'>
            <h2 className='text-[20px] leading-[22px] text-[#2A254B] font-semibold'>CATEGORY:</h2>
            <p className='text-[16px] leading-[21px] text-[#2A254B]' >{currentProduct.category.name}</p>
          </div>

          {/* <Rendering price={currentProduct?.price}/>
          <AddToCartBtn productId={currentProduct._id} className='bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 p-2 rounded'/>   */}
        </div>
      </section>
  
    </>
  );
}