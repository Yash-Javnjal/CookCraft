import Link from "next/link";

export default function About() {
  return (
    <main className="w-full text-left">
      {/* Section 1: Hero - The Heart of the Home */}
      <section className="relative w-full h-[819px] flex items-center justify-center overflow-hidden mb-section-gap">
        <div className="absolute inset-0 z-0">
          <img
            alt="Rustic Kitchen"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzjXKZ4hPLUf-EkEZWwHY8X3dKuFCjbLmrf92ca2HcdLV5HWy7CU5xe6EGv-V3_zfnyxo_YR_hL-zw9G4bdrnASTUPV5-auhCzzGPLuUCo0VApljyQtdzpiuRPVD65ac2KZpoB-AMOBeaSMhFhkWG1K2tDbU50QMaI8y-v1OcH9ys06Gbhr5wSpkGHrCRe4J1aZtcoRZhmTz3-b-m87YCuGZXBFhQHmW31oAJmC0obZCaK8QkqaI_EnkvuXqf1A-67K8HF9msJGJPt"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
          <h1 className="font-headline-xl text-headline-xl md:text-[64px] text-surface-container-lowest mb-6 drop-shadow-md">
            Every Great Dish Begins with a Story.
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mx-auto drop-shadow">
            At CookCraft, we believe the most extraordinary meals aren't found in cookbooks, but in the ingredients already waiting in your pantry.
          </p>
        </div>
      </section>

      {/* Section 2: The Art of the Scraps */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="bg-surface-container-lowest p-4 pb-12 rounded-sm soft-shadow transform -rotate-2 relative z-10 border border-outline-variant/10">
              <img
                alt="Ingredients Scraps"
                className="w-full h-auto object-cover rounded-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKAkoIHzYUu9Uk7mQkiY6G9dyCJkm2dWhwhqKJ5SLVd8mIL6WYpalaJiu7PLNR-I8oc08i03KqhyNpsZZb1rmv1TY1pNkmwSqsU-UvJPrF92Cj51GfK1YTmtkdzu81tvXhk6QbEtG01hQzM0RDoD5PVl8M70-XuPivEX6oZ30RjC3BoaHC77JVmc7zpy_yepeWmZL_oX0LVIFbr6iFfTNatJXemm7AxNCdZ-PSr7LwZYQ_Ff-jUxI9p84_d1pq26jtJqu0m_PQL4T0"
              />
              <p className="absolute bottom-4 left-6 font-label-accent text-label-accent text-outline opacity-80 italic">
                Honoring the humble ingredient.
              </p>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Honoring the Ingredient.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              A lonely sprig of rosemary. The heel of a loaf. Three sun-ripened tomatoes. We see potential where others see waste.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant border-l-4 border-secondary/40 pl-4 py-2 italic bg-surface-container/30 leading-relaxed">
              CookCraft was born from the belief that cooking is an act of preservation—of flavor, of resources, and of the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Ingredient Matching */}
      <section className="bg-surface-container-low py-section-gap mb-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Discovery at Your Fingertips.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Input what you have, and let our culinary intuition guide you to your next favorite meal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Note 1 */}
            <div className="bg-[#ffffeb] p-8 rounded shadow-[0_4px_15px_rgba(46,70,0,0.05)] transform rotate-1 hover:rotate-0 transition-transform duration-300 relative border border-outline-variant/10">
              <span className="material-symbols-outlined absolute top-4 right-4 text-outline/40">kitchen</span>
              <h3 className="font-headline-md text-headline-md text-on-background mb-4 border-b border-outline-variant/30 pb-2">
                1. Inventory
              </h3>
              <p className="font-label-accent text-label-accent text-on-surface-variant italic leading-relaxed">
                Open your pantry. Tell us about the half-onion, the wilting spinach, the lone egg. Every ingredient is a starting point.
              </p>
            </div>
            {/* Note 2 */}
            <div className="bg-surface-container-lowest p-8 rounded shadow-[0_4px_15px_rgba(46,70,0,0.05)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative border-t-4 border-primary border border-outline-variant/10">
              <span className="material-symbols-outlined absolute top-4 right-4 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-outline-variant/30 pb-2">
                2. Match
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Our engine sifts through thousands of culinary narratives, finding the perfect flavor profiles that unite your scraps into a cohesive dish.
              </p>
            </div>
            {/* Note 3 */}
            <div className="bg-[#f9f5ed] p-8 rounded shadow-[0_4px_15px_rgba(46,70,0,0.05)] transform rotate-2 hover:rotate-0 transition-transform duration-300 relative border border-outline-variant/10">
              <span className="material-symbols-outlined absolute top-4 right-4 text-outline/40">restaurant_menu</span>
              <h3 className="font-headline-md text-headline-md text-secondary mb-4 border-b border-outline-variant/30 pb-2">
                3. Craft
              </h3>
              <p className="font-label-accent text-label-accent text-on-surface-variant italic leading-relaxed">
                Follow the story. We provide flexible guidance, encouraging you to taste, adjust, and make the recipe truly your own.
              </p>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/3 -translate-x-1/4"></div>
      </section>

      {/* Section 4: A Global Table */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-center bg-surface-container-lowest soft-shadow rounded-lg overflow-hidden border border-outline-variant/10">
          <div className="w-full md:w-1/2 h-64 md:h-[500px]">
            <img
              alt="Global Spices"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf8pqf0N_ko3aRG5B7BTIUhwzMMZ-nTI6o3e_BgGSpXEpU9xQMvn-gsB9TYvdWNUpEirvHg5WAPg8A4BeL_-zuRGtldyYZ9E0eMbb2pE2bBkyEYuYwW6VnQ_vd0OEpI0t2kIHOBZ1OuoaTbDjohJegJXosg2R8csPY4uiacHkY14jwRWPV5vnVgGEzZoU9lBOvrXw3A3UD6y8uwmGZOpfCv5e0AlE_2DZDTtzvddetzum58o2ujDx2HVedBC4qmvRC5GzRIeN3UoZO"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest">Wanderlust</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Travel Without Leaving Your Kitchen.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
              From the bustling markets of Oaxaca to the quiet trattorias of Tuscany, we bring the world's culinary heritage to your stove, tailored to your palate and what you have on hand.
            </p>
            <Link href="/discover" className="self-start text-primary border-b border-primary pb-1 font-body-md text-body-md hover:text-secondary hover:border-secondary transition-colors duration-300 flex items-center gap-2">
              Start Exploring <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
