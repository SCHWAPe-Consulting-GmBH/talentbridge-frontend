import resume from '@/assets/images/write-resume.png';
import interview from '@/assets/images/interview-tips.png';
import profession from '@/assets/images/choose-profession.png';
import Image from 'next/image';

export const RecommendationsHub = () => {
  const data = [
    {
      imgSrc: resume,
      title: 'How to write a resume',
      description: 'Nunc nonummy metus. Donec elit libero'
    },
    {
      imgSrc: interview,
      title: 'Top interview tips',
      description: 'Nunc nonummy metus. Donec elit libero'
    },
    {
      imgSrc: profession,
      title: 'How to choose a profession',
      description: 'Nunc nonummy metus. Donec elit libero'
    },
  ]

  return (
    <section className="mt-[150px] flex flex-col items-center">
      <h2 className="font-bold text-[48px] mb-6">Recommended resources for you</h2>
      <p className="text-[16px] mb-[80px]">Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Morbi mattis ullamcorper velit.</p>
    
      <div className="flex w-full justify-between">
        {data.map(dataPiece => (
          <div className='flex flex-col items-center'>
            <Image
              src={dataPiece.imgSrc}
              alt="icon for recommendations"
              width={80}
            />

            <p className='mt-8 font-semibold text-[20px] text-themetext'>
              {dataPiece.title}
            </p>
            <p className='mt-2 text-neutral2 max-w-[215px] text-center leading-[22px]'>{dataPiece.description}</p>
            <button className='mt-3 bg-primary btn_green_hover py-[5px] w-[100px]'>More</button>
          </div>
        ))}
      </div>
    </section>
  )
}