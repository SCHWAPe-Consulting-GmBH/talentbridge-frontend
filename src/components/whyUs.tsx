export const WhyUs = () => {
  return (
    <div className="flex flex-col items-center mb-[100px]">
      <p className="text-primary border border-primary rounded-full font-bold text-[24px] px-4 py-2 mb-6">
        Why you should choose us?
      </p>
      <h3 className="text-themetext font-extrabold text-[48px] leading-[65px] mb-4">
        Lorem ipsum dolor sit amet
      </h3>
      <p className="font-medium text-neutral2 text-[24px] leading-[33px] mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <iframe
        width="1040"
        height="511"
        className="rounded-2xl"
        src="https://www.youtube.com/embed/gfU1iZnjRZM"
        // frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        // allowfullscreen
      />
    </div>
  );
};
