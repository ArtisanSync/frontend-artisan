// components/Service.js

function Service() {
  return (
    <section className=" text-white">
      <div className="ml-[126px] mr-[83px]">
        <div className="text-center mb-12">
          <h2 className="text-[#2563EB] text-[32px] font-bold">
            WHAT CAN WE DO FOR YOU
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="w-full h-full flex flex-col justify-center">
            <h3 className="text-[40px] font-bold  ">Our</h3>
            <h3 className="text-[40px] font-bold  ">Services</h3>
          </div>

          <div className="bg-black/60 py-[20px] px-[24px] rounded-xl shadow-lg hover:shadow-blue-500/30 transition">
            <p className="text-[48px] font-medium mb-[23px] text-white">01</p>
            <p className="text-[16px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant
              cras morbi hendrerit nunc vel sapien. In habitasse at diam
              suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut
              donec in. Ac diam, at sed cras nisi.
            </p>
          </div>

          <div className="bg-black/60 py-[20px] px-[24px] rounded-xl shadow-lg hover:shadow-blue-500/30 transition">
            <p className="text-[48px] font-medium mb-[23px] text-white">02</p>
            <p className="text-[16px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant
              cras morbi hendrerit nunc vel sapien. In habitasse at diam
              suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut
              donec in. Ac diam, at sed cras nisi.
            </p>
          </div>

          <div className="bg-black/60 py-[20px] px-[24px] rounded-xl shadow-lg hover:shadow-blue-500/30 transition">
            <p className="text-[48px] font-medium mb-[23px] text-white">03</p>
            <p className="text-[16px]m leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant
              cras morbi hendrerit nunc vel sapien. In habitasse at diam
              suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut
              donec in. Ac diam, at sed cras nisi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Service() {
//   return (
//     <>
//       <div>
//         <div className="flex justify-center">
//           <p className="font-bold text-[32px] text-[#2563EB]">
//             WHAT CAN WE DO FOR YOU
//           </p>
//         </div>
//         <div className="ml-[126px]">
//           <div className="grid grid-cols-4">
//             <p className="text-[40px] font-bold text-white text-center">
//               Our <br /> Services
//             </p>
//             <div>
//               <p>ini buat cardnya</p>
//             </div>
//             <div>
//               <p>ini buat cardnya</p>
//             </div>
//             <div>
//               <p>ini buat cardnya</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default Service;
