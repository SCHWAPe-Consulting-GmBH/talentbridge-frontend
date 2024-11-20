import Image from "next/image";
import document_icon from "@/assets/icons/document_portal.svg";

export const DocumentsPortal = () => {
  return (
    <section className="mt-[29px]">
      <h2 className="mb-[10px] text-themetext font-bold text-[20px]">
        Documents
      </h2>

      <div className="bg-background-second rounded-2xl pt-[15px] pl-[15px] pb-[20px] flex flex-col gap-5">
        {[1,2,3,4,5,6].map(document => (
          <div className="flex space-x-[10px]">
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-opacity-secondary">
              <Image
                src={document_icon}
                alt='document icon'
                width={18}
              />
            </div>
            <div>
              <p className="text-themetext font-bold leading-[20px]">Document Name</p>
              <p className="text-neutral2 text-[12px] leading-[20px]">02.03.2024</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
