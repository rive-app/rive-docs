export const VideoEmbed = ({ src }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >

      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
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