export function PostPageEn({
  background,
  title,
  subtitle,
  ...props
}: {
  background: string;
  title?: string;
  subtitle?: string;
}) {
  console.log(title?.split(" ")[0]);
  const titleArray = title?.split(" ");
  return (
    <div
      dir="rtl"
      style={{
        background: "rgb(24, 32, 47)",
        backgroundImage: `url(${background}?format=jpeg&width=900)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "center",
        color: "white",
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      <p tw="p-4 text-lg">accessed: {new Date().toString()}</p>
      <h2
        style={{
          fontFamily: "Vazirmatn",
          fontWeight: 600,
          textAlign: "right",
          fontSize: "60px",
        }}
      >
        ... {titleArray?.slice(0, 2).reverse().join(" ")}
      </h2>
      <h1
        tw="p-4 text-2xl text-red-500"
        style={{ fontFamily: "Montserrat", fontWeight: 600 }}
      >
        Rumination
      </h1>
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
