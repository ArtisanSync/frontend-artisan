import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";

async function getServices() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseURL}/services`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error loading services:", error);
    return [];
  }
}

function ServiceSkeleton() {
  return (
    <Card className="bg-black/60 border-none rounded-xl shadow-lg">
      <CardContent className="py-[20px] px-[24px]">
        <Skeleton className="h-12 w-12 rounded-md mb-[23px] bg-gray-700" />
        <Skeleton className="h-4 w-full rounded-md mb-2 bg-gray-700" />
        <Skeleton className="h-4 w-full rounded-md mb-2 bg-gray-700" />
        <Skeleton className="h-4 w-3/4 rounded-md bg-gray-700" />
      </CardContent>
    </Card>
  );
}

async function ServiceList() {
  const services = await getServices();

  return (
    <>
      {services.map((service) => (
        <Card
          key={service._id}
          className="bg-black/60 border-none rounded-xl shadow-lg hover:shadow-blue-500/30 transition"
        >
          <CardContent className="py-[20px] px-[24px]">
            <p className="text-4xl sm:text-[48px] font-medium mb-[23px] text-white">
              {service.number}
            </p>
            <h4 className="text-xl font-semibold text-blue-400 mb-2">
              {service.title}
            </h4>
            <p className="text-[16px] leading-relaxed text-white">
              {service.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default function Service() {
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

          <Suspense
            fallback={
              <>
                <ServiceSkeleton />
                <ServiceSkeleton />
                <ServiceSkeleton />
              </>
            }
          >
            <ServiceList />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
