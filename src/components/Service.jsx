import { Card, CardContent } from "./ui/card";

function Service() {
  const services = [
    {
      id: "01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant cras morbi hendrerit nunc vel sapien. In habitasse at diam suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut donec in. Ac diam, at sed cras nisi.",
    },
    {
      id: "02",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant cras morbi hendrerit nunc vel sapien. In habitasse at diam suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut donec in. Ac diam, at sed cras nisi.",
    },
    {
      id: "03",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant cras morbi hendrerit nunc vel sapien. In habitasse at diam suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut donec in. Ac diam, at sed cras nisi.",
    },
  ];

  return (
    <section className="text-white pt-4 sm:pt-6 md:pt-8" id="service">
      <div className="px-4 sm:px-6 lg:px-8 xl:ml-[126px] xl:mr-[83px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[#2563EB] text-2xl md:text-[32px] font-bold">
            WHAT CAN WE DO FOR YOU
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          <div className="w-full h-full flex flex-col justify-center text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="text-3xl lg:text-[40px] font-bold text-white">
              Our
            </h3>
            <h3 className="text-3xl lg:text-[40px] font-bold text-white">
              Services
            </h3>
          </div>

          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-black/60 border-none rounded-xl shadow-lg hover:shadow-blue-500/30 transition"
            >
              <CardContent className="py-[20px] px-[24px]">
                <p className="text-4xl sm:text-[48px] font-medium mb-[23px] text-white">
                  {service.id}
                </p>
                <p className="text-[16px] leading-relaxed text-white">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
