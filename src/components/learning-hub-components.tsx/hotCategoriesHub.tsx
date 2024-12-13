import health from '@/assets/images/health.png';
import banking from '@/assets/images/banking.png';
import accounting from '@/assets/images/accounting.png';
import customer from '@/assets/images/customer-service.png';
import design from '@/assets/images/design.png';
import development from '@/assets/images/development.png';
import marketing from '@/assets/images/marketing.png';
import IT from '@/assets/images/IT-hardware.png';
import Image from 'next/image';

export const HotCategoriesHub = () => {
  const categories = [
    {
      name: 'Accounting / Finance',
      imgSrc: accounting,
    },
    {
      name: 'Marketing',
      imgSrc: marketing,
    },
    {
      name: 'Design',
      imgSrc: design,
    },
    {
      name: 'Development',
      imgSrc: development,
    },
    {
      name: 'IT - Hardware',
      imgSrc: IT,
    },
    {
      name: 'Customer Service',
      imgSrc: customer,
    },
    {
      name: 'Health and Care',
      imgSrc: health,
    },
    {
      name: 'Banking',
      imgSrc: banking,
    },
  ];

  return (
    <section className="mt-[150px] flex flex-col items-center">
      <h2 className="font-bold text-[48px] mb-6">Hot Categories</h2>
      <p className="text-[16px] mb-[80px]">
        Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Morbi
        mattis ullamcorper velit.
      </p>

      <div className="grid grid-cols-category-hub grid-rows-category-hub gap-8">
        {categories.map((category) => (
          <div className="rounded-xl bg-background-second flex flex-col items-center justify-center course_shadow border border-transparent green_border_hover">
            <div
              className={`p-3 mb-4 ${category.name === 'Design' && 'rounded-full bg-primary'}`}
            >
              <Image
                src={category.imgSrc}
                alt={`${category.name} category icon`}
                width={48}
              />
            </div>

            <p className='text-themetext font-semibold text-[18px] leading-[28px]'>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
