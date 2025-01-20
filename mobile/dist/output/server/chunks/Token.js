function IsTokenExpired(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1e3);
  return payload.exp < currentTime;
}
function IsValidToken(token) {
  try {
    const [header, payload] = token.split(".");
    const base64UrlDecode = (base64Url) => {
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      return atob(base64);
    };
    const decodedPayload = JSON.parse(base64UrlDecode(payload));
    if (typeof decodedPayload.exp !== "number") {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1e3);
    if (decodedPayload.exp < currentTime) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
function getID(token) {
  const payload = token.split(".")[1];
  const paddedPayload = payload.padEnd(
    payload.length + (4 - payload.length % 4) % 4,
    "="
  );
  const decodedPayload = JSON.parse(atob(paddedPayload));
  const sub = decodedPayload.sub;
  return sub;
}
export {
  IsTokenExpired as I,
  IsValidToken as a,
  getID as g
};
