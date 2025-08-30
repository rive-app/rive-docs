export const RiveCard = ({ children, link, title, description }) => {

  return (
    <a
      href={link}
      target="_blank"
      className="card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer hover:!border-primary dark:hover:!border-primary-light"
    >
      {/* Examples have a 4:3 aspect ratio */}
      <div className="w-full h-0 relative pb-[75%]">
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
      <div class="px-6 py-5 relative" data-component-part="card-content-container">
        <div id="card-link-arrow-icon" class="absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </div>
        <div>
          <h2 class="not-prose font-semibold text-base text-gray-800 dark:text-white" contenteditable="false" data-component-part="card-title">{ title }</h2>
          {
            description && (
              <div class="prose mt-1 font-normal text-sm leading-6 text-gray-600 dark:text-gray-400" data-component-part="card-content">
                <span data-as="p">{ description }</span>
              </div>
            )
          }
        </div>
      </div>
   </a>
  );
};
