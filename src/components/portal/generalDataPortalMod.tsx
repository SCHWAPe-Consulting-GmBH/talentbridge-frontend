import frame from '@/assets/images/frame.png';
import Image from 'next/image';
export default function GeneralDataPortalMod() {
  return (
    <div className="max-w-[280px] w-[100%]">
      <h2 className="text-themetext font-bold text-[20px] mb-2">General Data</h2>
      <Image src={frame} alt="add homework" width={280} height={370} />
    </div>
  );
}
