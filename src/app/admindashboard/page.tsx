import Link from "next/link";
import HeaderAdmin from "@/components/HeaderAdmin";
import FooterAdmin from "@/components/FooterAdmin";

export default function AdminDashboard() {
  return (
    <div className='min-h-screen flex flex-col'>
      <HeaderAdmin />
      <section className='flex-grow bg-gradient-to-t from-gray-100 to-white'>
        <div className='container mx-auto px-4'>
          <div
            className='py-14 flex flex-col justify-center'
            style={{ height: "85vh" }}
          >
            <h2 className='text-3xl sm:text-4xl font-extrabold mb-11 text-center'>
              Welcome Admin
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8'>
              {["Quotation Order", "Purchase Order", "Bills"].map(
                (category, index) => {
                  const gradientClasses = [
                    "bg-gradient-to-b from-[#1D3EDE] to-[#4F8EF7]",
                    "bg-gradient-to-b from-[#4F8EF7] to-[#29A9D1]",
                    "bg-gradient-to-b from-[#3023AE] to-[#C86DD7]",
                  ];

                  return (
                    <Link
                      key={category}
                      href={`/products?category=${category.toLowerCase()}`}
                      className='group'
                    >
                      <div
                        className={`relative min-h-[250px] p-6 text-black shadow-lg transition-transform transform group-hover:scale-105 rounded-lg overflow-hidden ${
                          gradientClasses[index % 3]
                        } hover:shadow-2xl`}
                      >
                        <div className='absolute right-4 bottom-4 opacity-10 text-white pointer-events-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-52 h-52'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            {index === 0 && (
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M9 12l2 2 4-4m-7 7h8M5 5h14v14H5z'
                              />
                            )}
                            {index === 1 && (
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M9 5h6m-6 4h6m-6 4h6M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z'
                              />
                            )}
                            {index === 2 && (
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M9 14h6M9 10h6M7 3h10a2 2 0 012 2v14l-2-2-2 2-2-2-2 2-2-2-2 2V5a2 2 0 012-2z'
                              />
                            )}
                          </svg>
                        </div>

                        <div className='relative z-10 flex flex-col items-start justify-center h-full'>
                          <h3 className='text-white text-3xl font-semibold'>
                            {category}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <FooterAdmin />
    </div>
  );
}
