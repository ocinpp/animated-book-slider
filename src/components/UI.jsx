import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

export const isFlippingAtom = atom(false);
export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

// construct content pages, left and right
export const pagesOnly = [];
for (let i = 0; i < pictures.length; i += 2) {
  pagesOnly.push({
    left: pictures[i],
    right: pictures[i + 1],
  });
}

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [isFlipping] = useAtom(isFlippingAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();

    // scroll the thumbnail stripe to show the thumbnail
    const thumbs = document.querySelectorAll(".referenceThumb");
    thumbs.forEach((thumb, index) => {
      if (page === index) {
        // Scroll the thumbnail into view
        thumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (isFlipping) {
      return;
    }
    setPage(newPage);
  };

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-end flex-col">
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="referenceThumbs flex items-center gap-1 max-w-full p-4">
            <div
              className={`referenceThumb flex items-center border-transparent hover:border-white transition-all duration-300 px-1 py-2 border shrink-0 ${
                0 === page ? "bg-white/30" : ""
              }`}
              onClick={() => handlePageChange(0)}
              disabled={isFlipping}
            >
              <img
                src={`/textures/book-cover.jpg`}
                className={`max-h-[100px] w-auto object-contain`}
              />
            </div>
            {[...pagesOnly].map((pageOnly, index) => (
              <div
                key={index}
                className={`referenceThumb flex items-center border-transparent hover:border-white transition-all duration-300 px-2 py-2 border shrink-0 ${
                  index + 1 === page ? "bg-white/30" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
                disabled={isFlipping}
              >
                <img
                  key={`left-${index}`}
                  src={`/textures/${pageOnly.left}.jpg`}
                  className={`max-h-[100px] w-auto object-contain`}
                />
                <img
                  key={`right-${index}`}
                  src={`/textures/${pageOnly.right}.jpg`}
                  className={`max-h-[100px] w-auto object-contain`}
                />
              </div>
            ))}

            <div
              className={`referenceThumb flex items-center border-transparent hover:border-white transition-all duration-300 px-2 py-2 border shrink-0 ${
                pages.length === page ? "bg-white/30" : ""
              }`}
              onClick={() => handlePageChange(pages.length)}
              disabled={isFlipping}
            >
              <img
                src={`/textures/book-back.jpg`}
                className={`max-h-[100px] w-auto object-contain`}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
