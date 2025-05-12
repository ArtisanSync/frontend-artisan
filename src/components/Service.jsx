"use client";

import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useServices } from "@/hooks/use-services";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

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

function ServiceList({ services }) {
  if (!services || services.length === 0) {
    return <p className="text-gray-400">No services available.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {services.map((service) => (
        <div
          key={service._id}
          className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] 2xl:w-[calc(25%-16px)]"
        >
          <Card className="bg-black/60 border-none rounded-xl shadow-lg hover:shadow-blue-500/30 flex flex-col h-full">
            <CardContent className="py-[20px] px-[24px] flex flex-col flex-grow justify-between h-full">
              <div className="flex flex-col h-full">
                <p className="text-4xl sm:text-[48px] font-medium mb-[23px] text-white text-center">
                  {service.number}
                </p>
                <h4 className="text-xl font-semibold text-blue-400 mb-2 text-center">
                  {service.title}
                </h4>
                <p className="text-[16px] leading-relaxed text-white text-justify hyphens-auto flex-grow">
                  {service.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

function ErrorDisplay({ refetch }) {
  return (
    <Card className="bg-black/60 border-none rounded-xl shadow-lg col-span-3">
      <CardContent className="py-[30px] px-[24px] flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h4 className="text-xl font-semibold text-white mb-2">
          Failed to load services
        </h4>
        <p className="text-[16px] leading-relaxed text-gray-300 mb-6 text-center">
          There was a problem loading the services. Please try again.
        </p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => refetch()}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Service() {
  const { data, isLoading, isError, refetch } = useServices();
  const services = data?.data || [];

  return (
    <section className="text-white mt-4 sm:mt-6 md:mt-8" id="service">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[#2563EB] text-2xl md:text-[32px] font-bold">
            WHAT CAN WE DO FOR YOU
          </h2>
        </div>

        <div className="w-full max-w-full mx-auto">
          {isLoading ? (
            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]">
                <ServiceSkeleton />
              </div>
              <div className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]">
                <ServiceSkeleton />
              </div>
              <div className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]">
                <ServiceSkeleton />
              </div>
            </div>
          ) : isError ? (
            <ErrorDisplay refetch={refetch} />
          ) : (
            <ServiceList services={services} />
          )}
        </div>
      </div>
    </section>
  );
}
