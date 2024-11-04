const Onboarding = () => {
  return (
    <main className="px-[100px] pt-[100px] onboard1">
      <div className="max-w-[620px] justify-center">
        <div className="flex space-x-2 mb-[60px]">
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
        </div>
        <h1 className="font-extrabold text-[48px] leading-[65px] text-center mb-9">
          Basic Demographic Information
        </h1>

        <div className="bg-white px-10 py-12 rounded-lg flex flex-col items-center">
          <h2 className="font-medium text-[24px] mb-6"> What is your age range?</h2>
        </div>
      </div>
    </main>
  );
};

export default Onboarding;
