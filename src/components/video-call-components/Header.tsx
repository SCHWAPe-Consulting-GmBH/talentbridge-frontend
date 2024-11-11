import Image from 'next/image';
import dot from '@/assets/icons/ellipse_dot.svg';

const Header = () => {
  return (
    <header className="flex items-center space-x-2 mb-8">
      <h1 className="text-xl font-semibold">Course</h1>
      <Image src={dot} alt="dot" width={5} height={5} />
      <h1 className="text-xl font-semibold">Graphic Design</h1>
      <Image src={dot} alt="dot" width={5} height={5} />
      <h1 className="text-xl font-semibold">Registration</h1>
    </header>
  );
};

export default Header;
