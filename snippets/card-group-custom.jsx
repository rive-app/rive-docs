export const CardGroupCustom = ({ children }) => {
  return (
    <div
      className="
        columns
        prose
        dark:prose-invert
        grid
        max-w-none
        gap-4
        grid
        grid-cols-2
        md:grid-cols-3
        columns
        card-group
        dark:prose-dark
        gap-y-0
      "
      style={{
        "--cols": 3
      }}
    >

      {children}
    </div>
  );
};