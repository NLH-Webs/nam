// Keep first-touch UTM and referrer for the whole visit, so the sign-up form
// and the email fallback can say where the visitor came from.
// Same sessionStorage keys as the shared nlh-contact form (nlh_utm_source, ...).
export const captureFirstTouch = () => {
  try {
    const q = new URLSearchParams(location.search);
    ["utm_source", "utm_medium", "utm_campaign"].forEach((k) => {
      const v = q.get(k);
      if (v && !sessionStorage.getItem("nlh_" + k)) sessionStorage.setItem("nlh_" + k, v);
    });
    if (!sessionStorage.getItem("nlh_referrer")) sessionStorage.setItem("nlh_referrer", document.referrer || "(direct)");
  } catch {
    /* storage blocked: ignore */
  }
};
