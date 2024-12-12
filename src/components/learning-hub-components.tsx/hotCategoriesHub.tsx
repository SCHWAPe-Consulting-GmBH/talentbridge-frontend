import health from '@/assets/images/health.png';
import banking from '@/assets/images/banking.png';
import accounting from '@/assets/images/accounting.png';
import customer from '@/assets/images/customer-service.png';
import design from '@/assets/images/design.png';
import development from '@/assets/images/development.png';
import marketing from '@/assets/images/marketing.png';
import IT from '@/assets/images/IT-hardware.png';

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
  ]

  return (
    <section className="mt-[150px] flex items-center">
      <h2 className="font-bold text-[48px] mb-6">Hot Categories</h2>
      <p className="text-[16px] mb-[80px]">Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Morbi mattis ullamcorper velit.</p>
    
      <div className='grid grid-cols-4 gap-4'>
        {categories.map(category => (
          <div className='rounded-xl bg-background max-w-[64px] max-h-[64px]'>

          </div>
        ))}
      </div>
    </section>
  );
};
