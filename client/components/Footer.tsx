import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-section-gap bg-surface-container-highest border-t border-outline-variant/30 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop gap-8">
        <div className="flex flex-col items-start gap-4">
          <span className="font-headline-md text-headline-md text-primary italic">CookCraft</span>
          <p className="font-body-md text-on-surface-variant max-w-xs text-left">
            © 2026 CookCraft. Every great recipe begins with what you already have.
          </p>
        </div>
        <div className="flex gap-8 md:gap-16 w-full md:w-auto justify-between md:justify-end flex-wrap">
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-left">
              The Story
            </Link>
            <Link href="/about" className="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-left">
              Chef Collective
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-left">
              Terms of Service
            </Link>
            <Link href="/journal" className="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md font-bold text-left">
              Journal 
            </Link>
          </div>
        </div>
        <div className="flex gap-4 self-center md:self-auto">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined text-[18px]">Mail</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
