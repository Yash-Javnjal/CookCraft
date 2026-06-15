export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-outline-variant border-t-primary animate-spin"></div>
        <span className="material-symbols-outlined absolute text-primary text-xl animate-pulse">
          eco
        </span>
      </div>
      <p className="mt-4 font-label-accent text-label-accent italic text-on-surface-variant">
        Gathering the harvest, preheating the hearth...
      </p>
    </div>
  );
}
