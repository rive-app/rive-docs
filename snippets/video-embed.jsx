export const VideoEmbed = ({ src, maxWidth }) => {
  return (
    <div
      style={{ height: "100%"}}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          maxWidth: maxWidth || "100%",
          height: "100%",
          borderRadius: 0,
          margin: 0,
          display: "block",
          objectFit: "cover",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};