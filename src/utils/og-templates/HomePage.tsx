export function HomePageEn({
  background,
  title,
  subtitle,
  ...props
}: {
  background: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        background: "rgb(24, 32, 47)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "64px", color: "red" }}>
          {title || "Rumination"}
        </h1>
        {subtitle && <h3 style={{ fontSize: "32px" }}>{subtitle}</h3>}
      </div>
      <p
        style={{
          fontSize: "24px",
          position: "absolute",
          top: "10px",
          right: "50px",
        }}
      >
        {new Date().getFullYear()}
      </p>
    </div>
  );
}

export function HomePageFa({
  background,
  title,
  subtitle,
  ...props
}: {
  background: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        direction: "rtl",
        letterSpacing: "-.02em",
        fontFamily: "Vazirmatn",
        background: "rgb(24, 32, 47)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "64px", color: "red" }}>
          {title || "Rumination"}
        </h1>
        {subtitle && <h3 style={{ fontSize: "32px" }}>{subtitle}</h3>}
      </div>
      <p
        style={{
          fontSize: "24px",
          position: "absolute",
          top: "10px",
          right: "50px",
        }}
      >
        {new Date().getFullYear()}
      </p>
    </div>
  );
}
