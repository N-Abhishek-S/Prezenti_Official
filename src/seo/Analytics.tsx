export function Analytics() {
  // Replace 'G-XXXXXXXXXX' with actual Measurement ID from Google Analytics GA4
  const MEASUREMENT_ID = 'G-XXXXXXXXXX';

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
